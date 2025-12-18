const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ WebRTC Signaling Server is LIVE');
});

const wss = new WebSocket.Server({ server });
const rooms = new Map(); // Map<RoomID, Set<WebSocket>>

console.log('🚀 Starting WebRTC Signaling Server...');

wss.on('connection', (ws) => {
    ws.id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    console.log(`✅ Client connected: ${ws.id}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            switch (data.type) {
                case 'create-room':
                    if (!rooms.has(data.roomId)) {
                        rooms.set(data.roomId, new Set());
                    }
                    rooms.get(data.roomId).add(ws);
                    ws.roomId = data.roomId;
                    ws.isBroadcaster = true;
                    
                    ws.send(JSON.stringify({ type: 'room-created', roomId: data.roomId }));
                    console.log(`🎥 Room created: ${data.roomId}`);
                    break;

                case 'join-room':
                    if (rooms.has(data.roomId)) {
                        rooms.get(data.roomId).add(ws);
                        ws.roomId = data.roomId;
                        
                        ws.send(JSON.stringify({ type: 'room-joined', roomId: data.roomId }));
                        
                        // إبلاغ المذيع بوجود مشاهد جديد
                        rooms.get(data.roomId).forEach(client => {
                            if (client !== ws && client.isBroadcaster) {
                                client.send(JSON.stringify({
                                    type: 'new-viewer',
                                    viewerId: ws.id // نستخدم ID السوكيت لضمان الدقة
                                }));
                            }
                        });
                        console.log(`👤 Viewer joined: ${data.roomId}`);
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'الغرفة غير موجودة أو لم يبدأ البث بعد' }));
                    }
                    break;

                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    // توجيه الرسالة للشخص المحدد فقط (Targeted Signaling)
                    if (rooms.has(data.roomId)) {
                        rooms.get(data.roomId).forEach(client => {
                            // إذا كان هناك targetId، أرسل له فقط. وإلا أرسل للطرف الآخر
                            const shouldSend = data.targetId ? client.id === data.targetId : client !== ws;
                            
                            if (shouldSend && client.readyState === WebSocket.OPEN) {
                                // نضيف senderId ليعرف المستقبل من أين جاءت الرسالة
                                data.senderId = ws.id;
                                client.send(JSON.stringify(data));
                            }
                        });
                    }
                    break;
            }
        } catch (error) {
            console.error('❌ Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        if (ws.roomId && rooms.has(ws.roomId)) {
            rooms.get(ws.roomId).delete(ws);
            if (rooms.get(ws.roomId).size === 0) {
                rooms.delete(ws.roomId);
                console.log(`🗑 Room deleted: ${ws.roomId}`);
            }
        }
        console.log(`🔌 Client disconnected: ${ws.id}`);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
