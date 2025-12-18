const WebSocket = require('ws');
const http = require('http');

// 1. إنشاء سيرفر HTTP
const server = http.createServer((req, res) => {
    // السماح بـ CORS من أي مصدر
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ WebRTC Signaling Server is LIVE\n\nRoom Status: ' + Array.from(rooms.keys()).join(', ') || 'No active rooms');
});

// 2. إنشاء WebSocket Server
const wss = new WebSocket.Server({ 
    server,
    clientTracking: true,
    perMessageDeflate: false
});

// 3. تخزين الغرف
const rooms = new Map(); // roomId -> Set of clients
const clients = new Map(); // WebSocket -> {roomId, role}

console.log('🚀 Starting SIMPLE WebRTC Signaling Server...');

wss.on('connection', (ws, req) => {
    const clientId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    console.log(`✅ New connection: ${clientId} from ${req.socket.remoteAddress}`);
    
    // إرسال رسالة ترحيبية فورية
    ws.send(JSON.stringify({
        type: 'welcome',
        clientId: clientId,
        message: 'Connected to signaling server',
        timestamp: Date.now()
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            console.log(`📩 ${clientId}: ${data.type} ${data.roomId ? `(room: ${data.roomId})` : ''}`);
            
            switch (data.type) {
                case 'create-room':
                    handleCreateRoom(ws, clientId, data);
                    break;
                    
                case 'join-room':
                    handleJoinRoom(ws, clientId, data);
                    break;
                    
                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    forwardMessage(ws, data);
                    break;
                    
                case 'ping':
                    ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
                    break;
            }
        } catch (error) {
            console.error('❌ Parse error:', error);
        }
    });

    ws.on('error', (error) => {
        console.error(`❌ ${clientId} error:`, error);
    });

    ws.on('close', () => {
        console.log(`🔌 ${clientId} disconnected`);
        const clientInfo = clients.get(ws);
        if (clientInfo) {
            if (clientInfo.roomId && rooms.has(clientInfo.roomId)) {
                rooms.get(clientInfo.roomId).delete(ws);
                if (rooms.get(clientInfo.roomId).size === 0) {
                    rooms.delete(clientInfo.roomId);
                    console.log(`🗑️ Room ${clientInfo.roomId} deleted (empty)`);
                }
            }
            clients.delete(ws);
        }
    });

    // تخزين معلومات العميل
    clients.set(ws, { id: clientId });
});

function handleCreateRoom(ws, clientId, data) {
    const roomId = data.roomId || 'default-room';
    
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
    }
    
    rooms.get(roomId).add(ws);
    clients.set(ws, { id: clientId, roomId: roomId, role: 'broadcaster' });
    
    console.log(`🎬 Room ${roomId} created by ${clientId}`);
    
    ws.send(JSON.stringify({
        type: 'room-created',
        roomId: roomId,
        message: 'Room ready for viewers',
        timestamp: Date.now()
    }));
}

function handleJoinRoom(ws, clientId, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) {
        console.log(`❌ Room ${roomId} not found`);
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room not found. Make sure broadcaster has started the stream.',
            roomId: roomId
        }));
        return;
    }
    
    // إضافة المشاهد للغرفة
    rooms.get(roomId).add(ws);
    clients.set(ws, { id: clientId, roomId: roomId, role: 'viewer' });
    
    console.log(`👤 ${clientId} joined room ${roomId} (total: ${rooms.get(roomId).size})`);
    
    // تأكيد الانضمام للمشاهد
    ws.send(JSON.stringify({
        type: 'room-joined',
        roomId: roomId,
        message: 'Successfully joined room. Waiting for stream...',
        timestamp: Date.now()
    }));
    
    // إعلام المديع بمشاهد جديد
    broadcastToRoom(roomId, ws, {
        type: 'new-viewer',
        viewerId: clientId,
        timestamp: Date.now()
    });
}

function forwardMessage(senderWs, data) {
    const senderInfo = clients.get(senderWs);
    if (!senderInfo || !senderInfo.roomId) {
        console.log('❌ No room info for sender');
        return;
    }
    
    const roomId = senderInfo.roomId;
    if (!rooms.has(roomId)) return;
    
    // إضافة معلومات المرسل
    const messageWithSender = {
        ...data,
        senderId: senderInfo.id,
        senderRole: senderInfo.role
    };
    
    // إرسال لجميع العملاء الآخرين في الغرفة
    broadcastToRoom(roomId, senderWs, messageWithSender);
}

function broadcastToRoom(roomId, senderWs, data) {
    const room = rooms.get(roomId);
    if (!room) return;
    
    let count = 0;
    room.forEach(client => {
        if (client !== senderWs && client.readyState === 1) { // 1 = OPEN
            client.send(JSON.stringify(data));
            count++;
        }
    });
    
    if (count > 0) {
        console.log(`   📤 Forwarded ${data.type} to ${count} client(s)`);
    }
}

// إظهار حالة السيرفر كل 30 ثانية
setInterval(() => {
    console.log(`📊 Server Status: ${rooms.size} rooms, ${wss.clients.size} total clients`);
}, 30000);

// تشغيل السيرفر
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 WebSocket: ws://localhost:${PORT}`);
    console.log(`🌐 HTTP: http://localhost:${PORT}`);
});
