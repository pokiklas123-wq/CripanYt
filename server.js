const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 1. إعدادات CORS للسماح بالاتصال من أي نطاق
const io = new Server(server, {
  cors: {
    origin: "*", // يمكنك تحديد نطاقات محددة لاحقاً
    methods: ["GET", "POST"]
  }
});

// 2. خدمة الملفات الثابتة (HTML, CSS, JS)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 3. تخزين المستخدمين والقنوات
const channels = new Map(); // channelId -> { users: [] }

// 4. معالجة اتصالات Socket.io
io.on('connection', (socket) => {
  console.log('✅ مستخدم متصل:', socket.id);

  // الانضمام إلى قناة
  socket.on('join-channel', (data) => {
    const { channelId, userId, isSpeaker } = data;
    
    socket.join(channelId);
    
    // إضافة المستخدم إلى القناة
    if (!channels.has(channelId)) {
      channels.set(channelId, { users: [] });
    }
    
    const channel = channels.get(channelId);
    const userExists = channel.users.find(u => u.socketId === socket.id);
    
    if (!userExists) {
      channel.users.push({
        socketId: socket.id,
        userId,
        isSpeaker,
        channelId
      });
    }
    
    // إعلام الآخرين بانضمام مستخدم جديد
    socket.to(channelId).emit('user-joined', {
      userId,
      isSpeaker,
      socketId: socket.id
    });
    
    // إرسال قائمة المستخدمين للمستخدم الجديد
    io.to(socket.id).emit('channel-users', channel.users);
    
    console.log(`👤 ${userId} انضم للقناة ${channelId}`);
  });

  // نقل إشارات WebRTC بين المستخدمين
  socket.on('webrtc-signal', (data) => {
    const { to, signal, type } = data;
    
    // إرسال الإشارة إلى المستخدم الهدف
    io.to(to).emit('webrtc-signal', {
      from: socket.id,
      signal: signal,
      type: type
    });
  });

  // إرسال رسالة دردشة
  socket.on('chat-message', (data) => {
    const { channelId, message, userId } = data;
    socket.to(channelId).emit('chat-message', {
      userId,
      message,
      timestamp: new Date().toISOString()
    });
  });

  // عند مغادرة المستخدم
  socket.on('disconnect', () => {
    // البحث عن المستخدم في جميع القنوات وإزالته
    channels.forEach((channel, channelId) => {
      const userIndex = channel.users.findIndex(u => u.socketId === socket.id);
      
      if (userIndex !== -1) {
        const user = channel.users[userIndex];
        channel.users.splice(userIndex, 1);
        
        // إعلام الآخرين بمغادرة المستخدم
        io.to(channelId).emit('user-left', {
          userId: user.userId,
          socketId: socket.id
        });
        
        console.log(`❌ ${user.userId} غادر القناة ${channelId}`);
      }
    });
  });
});

// 5. مسار للتحقق من حالة الخادم
app.get('/health', (req, res) => {
  res.json({ 
    status: 'active', 
    channels: Array.from(channels.keys()),
    timestamp: new Date().toISOString()
  });
});

// 6. المسار الرئيسي
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 7. تشغيل الخادم
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ: ${PORT}`);
  console.log(`🌐 افتح المتصفح: http://localhost:${PORT}`);
});
