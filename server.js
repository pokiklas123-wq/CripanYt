const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>WebRTC SFU Server</title>
            <style>
                body { font-family: Arial; padding: 20px; background: #0f0f23; color: #00ff00; }
                h1 { color: #00ccff; }
                .stats { background: #1a1a2e; padding: 15px; border-radius: 10px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <h1>✅ WebRTC SFU Server - Live Streaming</h1>
            <div class="stats">
                <p><strong>الحالة:</strong> 🟢 نشط</p>
                <p><strong>الغرف النشطة:</strong> ${rooms.size}</p>
                <p><strong>المشاهدون الكلي:</strong> ${Array.from(rooms.values()).reduce((sum, room) => sum + room.viewers.size, 0)}</p>
                <p><strong>السعة:</strong> 100 مشاهد لكل غرفة</p>
            </div>
        </body>
        </html>
    `);
});

const wss = new WebSocket.Server({ server });
const rooms = new Map();

console.log('🚀 WebRTC SFU Server Starting...');

wss.on('connection', (ws, req) => {
    ws.id = generateId();
    console.log(`✅ Client connected: ${ws.id}`);
    
    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            switch(data.type) {
                case 'create-room':
                    handleCreateRoom(ws, data);
                    break;
                    
                case 'join-room':
                    handleJoinRoom(ws, data);
                    break;
                    
                case 'broadcast-offer':
                    handleBroadcastOffer(ws, data);
                    break;
                    
                case 'answer':
                    handleAnswer(ws, data);
                    break;
                    
                case 'ice-candidate':
                    handleIceCandidate(ws, data);
                    break;
                    
                case 'ping':
                    ws.send(JSON.stringify({ type: 'pong' }));
                    break;
            }
        } catch (error) {
            console.error('❌ Error processing message:', error);
        }
    });
    
    ws.on('close', () => {
        handleDisconnection(ws);
        console.log(`🔌 Client disconnected: ${ws.id}`);
    });
    
    ws.on('error', (error) => {
        console.error(`❌ WebSocket error for ${ws.id}:`, error);
    });
});

// دالة إنشاء غرفة
function handleCreateRoom(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) {
        rooms.set(roomId, {
            broadcaster: ws,
            viewers: new Map(),
            mediaInfo: {
                sdp: null,
                iceCandidates: []
            }
        });
    } else {
        // إذا كانت الغرفة موجودة، استبدل المذيع
        rooms.get(roomId).broadcaster = ws;
    }
    
    ws.roomId = roomId;
    ws.role = 'broadcaster';
    
    ws.send(JSON.stringify({
        type: 'room-created',
        roomId: roomId,
        maxViewers: 100
    }));
    
    console.log(`🎥 Room created/updated: ${roomId}`);
}

// دالة الانضمام للغرفة
function handleJoinRoom(ws, data) {
    const roomId = data.roomId;
    const viewerId = data.viewerId || `viewer_${Date.now()}`;
    
    if (!rooms.has(roomId)) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'الغرفة غير موجودة'
        }));
        return;
    }
    
    const room = rooms.get(roomId);
    
    if (room.viewers.size >= 100) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'الغرفة ممتلئة (100 مشاهد)'
        }));
        return;
    }
    
    room.viewers.set(viewerId, ws);
    ws.roomId = roomId;
    ws.role = 'viewer';
    ws.viewerId = viewerId;
    
    ws.send(JSON.stringify({
        type: 'room-joined',
        roomId: roomId,
        viewerId: viewerId,
        totalViewers: room.viewers.size
    }));
    
    // إعلام المذيع بمشاهد جديد
    if (room.broadcaster && room.broadcaster.readyState === WebSocket.OPEN) {
        room.broadcaster.send(JSON.stringify({
            type: 'new-viewer',
            viewerId: viewerId,
            totalViewers: room.viewers.size
        }));
    }
    
    console.log(`👤 Viewer ${viewerId} joined room ${roomId} (total: ${room.viewers.size})`);
    
    // إذا كان هناك بث نشط، أرسل العرض للمشاهد الجديد
    if (room.mediaInfo.sdp) {
        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: 'broadcast-offer',
                    sdp: room.mediaInfo.sdp,
                    roomId: roomId
                }));
                
                // أرسل كل مرشحات ICE المخزنة
                room.mediaInfo.iceCandidates.forEach(candidate => {
                    ws.send(JSON.stringify({
                        type: 'ice-candidate',
                        candidate: candidate,
                        roomId: roomId
                    }));
                });
            }
        }, 500);
    }
}

// دالة معالجة العرض من المذيع
function handleBroadcastOffer(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId) || rooms.get(roomId).broadcaster !== ws) {
        return;
    }
    
    const room = rooms.get(roomId);
    
    // تحديث معلومات الوسائط
    room.mediaInfo.sdp = data.sdp;
    room.mediaInfo.iceCandidates = [];
    
    // إرسال العرض لجميع المشاهدين
    room.viewers.forEach((viewer, viewerId) => {
        if (viewer.readyState === WebSocket.OPEN) {
            viewer.send(JSON.stringify({
                type: 'broadcast-offer',
                sdp: data.sdp,
                roomId: roomId
            }));
        }
    });
    
    console.log(`📡 Broadcast offer sent to ${room.viewers.size} viewers in room ${roomId}`);
}

// دالة معالجة الإجابة من المشاهد
function handleAnswer(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) return;
    
    const room = rooms.get(roomId);
    
    // إرسال الإجابة للمذيع
    if (room.broadcaster && room.broadcaster.readyState === WebSocket.OPEN) {
        room.broadcaster.send(JSON.stringify({
            type: 'answer',
            answer: data.answer,
            viewerId: ws.viewerId || ws.id
        }));
    }
}

// دالة معالجة مرشحات ICE
function handleIceCandidate(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) return;
    
    const room = rooms.get(roomId);
    
    if (ws.role === 'broadcaster') {
        // مرشحات من المذيع، أرسلها لجميع المشاهدين
        room.viewers.forEach((viewer, viewerId) => {
            if (viewer.readyState === WebSocket.OPEN) {
                viewer.send(JSON.stringify({
                    type: 'ice-candidate',
                    candidate: data.candidate,
                    roomId: roomId
                }));
            }
        });
        
        // خزن مرشحات ICE للمشاهدين الجدد
        room.mediaInfo.iceCandidates.push(data.candidate);
    } else {
        // مرشحات من المشاهد، أرسلها للمذيع
        if (room.broadcaster && room.broadcaster.readyState === WebSocket.OPEN) {
            room.broadcaster.send(JSON.stringify({
                type: 'ice-candidate',
                candidate: data.candidate,
                viewerId: ws.viewerId || ws.id
            }));
        }
    }
}

// دالة معالجة انقطاع الاتصال
function handleDisconnection(ws) {
    if (!ws.roomId || !rooms.has(ws.roomId)) return;
    
    const room = rooms.get(ws.roomId);
    
    if (ws.role === 'broadcaster') {
        // إعلام جميع المشاهدين
        room.viewers.forEach((viewer, viewerId) => {
            if (viewer.readyState === WebSocket.OPEN) {
                viewer.send(JSON.stringify({
                    type: 'broadcaster-left',
                    message: 'انتهى البث'
                }));
            }
        });
        
        rooms.delete(ws.roomId);
        console.log(`📢 Broadcaster left, room ${ws.roomId} deleted`);
    } else if (ws.role === 'viewer' && ws.viewerId) {
        room.viewers.delete(ws.viewerId);
        
        // إعلام المذيع
        if (room.broadcaster && room.broadcaster.readyState === WebSocket.OPEN) {
            room.broadcaster.send(JSON.stringify({
                type: 'viewer-left',
                viewerId: ws.viewerId,
                totalViewers: room.viewers.size
            }));
        }
        
        console.log(`👋 Viewer ${ws.viewerId} left room ${ws.roomId} (remaining: ${room.viewers.size})`);
    }
}

// توليد معرف فريد
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// مراقبة الغرف
setInterval(() => {
    console.log(`📊 إحصائيات: ${rooms.size} غرفة نشطة`);
    rooms.forEach((room, roomId) => {
        console.log(`   ${roomId}: ${room.viewers.size} مشاهدين`);
    });
}, 60000);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🎯 يدعم 100 مشاهد لكل غرفة`);
});
