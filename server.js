/**
 * server.js
 * هذا السيرفر يعمل كـ SFU (Selective Forwarding Unit)
 * المعلم يرفع ستريم واحد، والسيرفر يوزعه للجميع.
 */

const express = require('express');
const app = express();
const https = require('http');
const { Server } = require('socket.io');
const mediasoup = require('mediasoup');
const fs = require('fs');
const path = require('path');

// إعداد السيرفر (Express + Socket.io)
const server = https.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // للسماح بالاتصال من أي مكان
    methods: ["GET", "POST"]
  }
});

// إعدادات Mediasoup
let worker;
let router;
let producerTransport;
let producer;
let consumerTransports = [];
let consumers = [];

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,
    parameters: {
      'x-google-start-bitrate': 1000
    }
  }
];

// 1. تشغيل Mediasoup Worker
async function startMediasoup() {
  worker = await mediasoup.createWorker({
    logLevel: 'warn',
    rtcMinPort: 2000,
    rtcMaxPort: 2100, // تأكد من فتح هذه البورتات في الـ VPS لاحقاً
  });

  worker.on('died', () => {
    console.error('mediasoup worker died, exiting in 2 seconds... [pid:%d]', worker.pid);
    setTimeout(() => process.exit(1), 2000);
  });

  router = await worker.createRouter({ mediaCodecs });
  console.log('✅ Mediasoup Router Created');
}

startMediasoup();

io.on('connection', async (socket) => {
  console.log('New connection:', socket.id);

  socket.emit('connection-success', {
    socketId: socket.id,
  });

  // 2. الحصول على إمكانيات الراوتر (RTP Capabilities)
  socket.on('getRouterRtpCapabilities', (callback) => {
    callback(router.rtpCapabilities);
  });

  // 3. إنشاء Transport (قناة اتصال)
  socket.on('createWebRtcTransport', async ({ sender }, callback) => {
    try {
      const webRtcTransport_options = {
        listenIps: [
          {
            ip: '0.0.0.0', // استمع على كل الواجهات
            announcedIp: '127.0.0.1', // ⚠️ هام: ضع هنا الـ Public IP الخاص بالسيرفر عند الرفع
          }
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      };

      let transport = await router.createWebRtcTransport(webRtcTransport_options);

      transport.on('dtlsstatechange', dtlsState => {
        if (dtlsState === 'closed') {
          transport.close();
        }
      });

      transport.on('close', () => {
        console.log('Transport closed');
      });

      // حفظ الـ Transport
      if (sender) {
        producerTransport = transport;
      } else {
        consumerTransports = [...consumerTransports, { consumerTransport: transport, socketId: socket.id }];
      }

      callback({
        params: {
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
        }
      });
    } catch (error) {
      console.error(error);
      callback({ params: { error: error } });
    }
  });

  // 4. توصيل الـ Transport
  socket.on('transport-connect', async ({ dtlsParameters }) => {
    // هنا نفترض أن الطالب هو المستهلك (Consumer) والمعلم هو المنتج (Producer)
    // لكن للتبسيط سنبحث في القوائم
    if (producerTransport && !consumerTransports.find(t => t.socketId === socket.id)) {
        await producerTransport.connect({ dtlsParameters });
    } else {
        let consumerData = consumerTransports.find(t => t.socketId === socket.id);
        if (consumerData) {
            await consumerData.consumerTransport.connect({ dtlsParameters });
        } else {
            // قد يكون المعلم هو من يتصل هنا كمنتج
            await producerTransport.connect({ dtlsParameters });
        }
    }
  });

  // 5. المعلم يبدأ البث (Produce)
  socket.on('transport-produce', async ({ kind, rtpParameters, appData }, callback) => {
    producer = await producerTransport.produce({
      kind,
      rtpParameters,
    });

    producer.on('transportclose', () => {
      console.log('Producer transport closed');
      producer.close();
    });

    console.log('✅ Producer created (Teacher is live)');
    
    // إبلاغ جميع الطلاب بأن هناك بث جديد
    socket.broadcast.emit('new-producer');

    callback({ id: producer.id });
  });

  // 6. الطالب يطلب استهلاك البث (Consume)
  socket.on('transport-recv-connect', async ({ dtlsParameters, serverConsumerTransportId }) => {
    const consumerTransport = consumerTransports.find(t => t.consumerTransport.id === serverConsumerTransportId).consumerTransport;
    await consumerTransport.connect({ dtlsParameters });
  });

  socket.on('consume', async ({ rtpCapabilities, remoteProducerId, serverConsumerTransportId }, callback) => {
    try {
      const consumerTransport = consumerTransports.find(t => t.consumerTransport.id === serverConsumerTransportId).consumerTransport;

      if (router.canConsume({
        producerId: remoteProducerId,
        rtpCapabilities
      })) {
        const consumer = await consumerTransport.consume({
          producerId: remoteProducerId,
          rtpCapabilities,
          paused: true, // نبدأ متوقفين ثم نشغل
        });

        consumer.on('transportclose', () => {
          console.log('Consumer transport closed');
        });

        consumer.on('producerclose', () => {
          console.log('Producer closed');
          socket.emit('producer-closed');
        });

        consumers = [...consumers, { consumer, socketId: socket.id }];

        callback({
          params: {
            id: consumer.id,
            producerId: remoteProducerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
          }
        });
      }
    } catch (error) {
      console.error(error);
      callback({ params: { error: error } });
    }
  });

  socket.on('consumer-resume', async ({ serverConsumerId }) => {
    const { consumer } = consumers.find(c => c.consumer.id === serverConsumerId);
    await consumer.resume();
  });
  
  // طلب معرف المنتج الحالي (للمشاهدين الجدد)
  socket.on('getProducers', callback => {
      if(producer) {
          callback([producer.id]);
      } else {
          callback([]);
      }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
