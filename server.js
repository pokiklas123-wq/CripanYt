const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Type': 'text/html; charset=utf-8' });
    res.end('✅ WebRTC SFU Server - يدعم 100 مشاهد');
});

const wss = new WebSocket.Server({ server });
const rooms = new Map();

console.log('🚀 Starting WebRTC SFU Server (50-100 viewers)...');

wss.on('connection', (ws, req) => {
    ws.id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    console.log(`✅ Client connected: ${ws.id}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            switch (data.type) {
                case 'create-room':
                    if (!rooms.has(data.roomId)) {
                        rooms.set(data.roomId, {
                            broadcaster: ws,
                            viewers: new Map(),
                            mediaInfo: null
                        });
                    } else {
                        rooms.get(data.roomId).broadcaster = ws;
                    }
                    ws.roomId = data.roomId;
                    ws.role = 'broadcaster';
                    
                    ws.send(JSON.stringify({ 
                        type: 'room-created', 
                        roomId: data.roomId,
                        maxViewers: 100 
                    }));
                    console.log(`🎥 Room created: ${data.roomId}`);
                    break;

                case 'join-room':
                    if (rooms.has(data.roomId)) {
                        const room = rooms.get(data.roomId);
                        const viewerId = data.viewerId || `viewer_${Date.now()}`;
                        
                        if (room.viewers.size >= 100) {
                            ws.send(JSON.stringify({ 
                                type: 'error', 
                                message: 'الغرفة ممتلئة (100 مشاهد)' 
                            }));
                            break;
                        }
                        
                        room.viewers.set(viewerId, ws);
                        ws.roomId = data.roomId;
                        ws.role = 'viewer';
                        ws.viewerId = viewerId;
                        
                        ws.send(JSON.stringify({ 
                            type: 'room-joined', 
                            roomId: data.roomId,
                            viewerId: viewerId,
                            totalViewers: room.viewers.size 
                        }));
                        
                        // ✅ إرسال البث الحالي للمشاهد الجديد فوراً
                        if (room.mediaInfo) {
                            setTimeout(() => {
                                if (ws.readyState === 1) {
                                    ws.send(JSON.stringify({
                                        type: 'media-stream',
                                        roomId: data.roomId,
                                        sdp: room.mediaInfo.sdp,
                                        mediaType: room.mediaInfo.type,
                                        senderId: 'broadcaster'
                                    }));
                                    console.log(`📡 Sent existing stream to new viewer: ${viewerId}`);
                                }
                            }, 500);
                        }
                        
                        // إعلام المديع
                        if (room.broadcaster && room.broadcaster.readyState === 1) {
                            room.broadcaster.send(JSON.stringify({
                                type: 'new-viewer',
                                viewerId: viewerId,
                                totalViewers: room.viewers.size
                            }));
                        }
                        
                        console.log(`👤 Viewer ${viewerId} joined: ${data.roomId} (total: ${room.viewers.size})`);
                    } else {
                        ws.send(JSON.stringify({ 
                            type: 'error', 
                            message: 'الغرفة غير موجودة' 
                        }));
                    }
                    break;

                case 'broadcast-media':
                    if (rooms.has(data.roomId)) {
                        const room = rooms.get(data.roomId);
                        if (room.broadcaster === ws) {
                            // ✅ تخزين معلومات البث
                            room.mediaInfo = {
                                sdp: data.sdp,
                                type: data.mediaType || 'video',
                                timestamp: Date.now()
                            };
                            
                            // ✅ إرسال لجميع المشاهدين الموجودين
                            room.viewers.forEach((viewer, viewerId) => {
                                if (viewer.readyState === 1) {
                                    viewer.send(JSON.stringify({
                                        type: 'media-stream',
                                        roomId: data.roomId,
                                        sdp: data.sdp,
                                        mediaType: data.mediaType || 'video',
                                        senderId: 'broadcaster'
                                    }));
                                }
                            });
                            
                            console.log(`📡 Broadcast to ${room.viewers.size} viewers`);
                        }
                    }
                    break;

                case 'answer':
                    if (rooms.has(data.roomId)) {
                        const room = rooms.get(data.roomId);
                        // إرسال الإجابة للمذيع فقط
                        if (room.broadcaster && room.broadcaster.readyState === 1) {
                            room.broadcaster.send(JSON.stringify({
                                type: 'answer',
                                answer: data.answer,
                                viewerId: data.viewerId || ws.viewerId
                            }));
                        }
                    }
                    break;

                case 'ice-candidate':
                    if (rooms.has(data.roomId)) {
                        const room = rooms.get(data.roomId);
                        if (data.targetId === 'broadcaster') {
                            // إرسال إلى المذيع
                            if (room.broadcaster && room.broadcaster.readyState === 1) {
                                room.broadcaster.send(JSON.stringify({
                                    type: 'ice-candidate',
                                    candidate: data.candidate,
                                    senderId: ws.viewerId || ws.id
                                }));
                            }
                        } else {
                            // إرسال إلى مشاهد محدد
                            const viewer = room.viewers.get(data.targetId);
                            if (viewer && viewer.readyState === 1) {
                                viewer.send(JSON.stringify({
                                    type: 'ice-candidate',
                                    candidate: data.candidate,
                                    senderId: ws.id
                                }));
                            }
                        }
                    }
                    break;

                case 'leave-room':
                    if (rooms.has(data.roomId)) {
                        const room = rooms.get(data.roomId);
                        if (ws.role === 'broadcaster') {
                            // إعلام المشاهدين
                            room.viewers.forEach(viewer => {
                                if (viewer.readyState === 1) {
                                    viewer.send(JSON.stringify({
                                        type: 'broadcaster-left',
                                        message: 'انتهى البث'
                                    }));
                                }
                            });
                            rooms.delete(data.roomId);
                        } else if (ws.role === 'viewer') {
                            room.viewers.delete(ws.viewerId);
                        }
                    }
                    break;
            }
        } catch (error) {
            console.error('❌ Error:', error);
        }
    });

    ws.on('close', () => {
        console.log(`🔌 Client disconnected: ${ws.id}`);
        
        if (ws.roomId && rooms.has(ws.roomId)) {
            const room = rooms.get(ws.roomId);
            
            if (ws.role === 'broadcaster') {
                // إعلام المشاهدين
                room.viewers.forEach(viewer => {
                    if (viewer.readyState === 1) {
                        viewer.send(JSON.stringify({
                            type: 'broadcaster-left',
                            message: 'انتهى البث'
                        }));
                    }
                });
                rooms.delete(ws.roomId);
            } else if (ws.role === 'viewer' && ws.viewerId) {
                room.viewers.delete(ws.viewerId);
                
                // إعلام المديع
                if (room.broadcaster && room.broadcaster.readyState === 1) {
                    room.broadcaster.send(JSON.stringify({
                        type: 'viewer-left',
                        viewerId: ws.viewerId,
                        totalViewers: room.viewers.size
                    }));
                }
            }
        }
    });
});

setInterval(() => {
    console.log(`📊 Active rooms: ${rooms.size}`);
    rooms.forEach((room, roomId) => {
        console.log(`   Room ${roomId}: ${room.viewers.size} viewers`);
    });
}, 30000);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
