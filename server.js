const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ WebRTC SFU Server Ready');
});

const wss = new WebSocket.Server({ server });
const rooms = new Map();

console.log('🚀 WebRTC SFU Server Starting...');

wss.on('connection', (ws) => {
    ws.id = Math.random().toString(36).substr(2, 9);
    console.log(`✅ Client connected: ${ws.id}`);
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            switch(data.type) {
                case 'create-room':
                    createRoom(ws, data);
                    break;
                    
                case 'join-room':
                    joinRoom(ws, data);
                    break;
                    
                case 'offer':
                    handleOffer(ws, data);
                    break;
                    
                case 'answer':
                    handleAnswer(ws, data);
                    break;
                    
                case 'ice-candidate':
                    handleIceCandidate(ws, data);
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    ws.on('close', () => {
        removeClient(ws);
    });
});

function createRoom(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) {
        rooms.set(roomId, {
            broadcaster: ws,
            viewers: new Map()
        });
    }
    
    ws.roomId = roomId;
    ws.role = 'broadcaster';
    
    ws.send(JSON.stringify({ type: 'room-created', roomId }));
}

function joinRoom(ws, data) {
    const roomId = data.roomId;
    
    if (!rooms.has(roomId)) {
        ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
        return;
    }
    
    const room = rooms.get(roomId);
    const viewerId = `viewer_${Date.now()}`;
    
    room.viewers.set(viewerId, ws);
    ws.roomId = roomId;
    ws.role = 'viewer';
    ws.viewerId = viewerId;
    
    ws.send(JSON.stringify({ type: 'room-joined', roomId, viewerId }));
    
    // إعلام البث بالمشاهد الجديد
    room.broadcaster.send(JSON.stringify({
        type: 'viewer-joined',
        viewerId,
        total: room.viewers.size
    }));
}

function handleOffer(ws, data) {
    const roomId = data.roomId;
    const room = rooms.get(roomId);
    
    if (!room) return;
    
    // إذا كان العرض من المذيع، أرسله لجميع المشاهدين
    if (ws.role === 'broadcaster') {
        room.viewers.forEach((viewer, viewerId) => {
            if (viewer.readyState === 1) {
                viewer.send(JSON.stringify({
                    type: 'offer',
                    sdp: data.sdp,
                    roomId
                }));
            }
        });
    }
}

function handleAnswer(ws, data) {
    const roomId = data.roomId;
    const room = rooms.get(roomId);
    
    if (!room) return;
    
    // أرسل الإجابة للمذيع
    room.broadcaster.send(JSON.stringify({
        type: 'answer',
        sdp: data.sdp,
        viewerId: ws.viewerId
    }));
}

function handleIceCandidate(ws, data) {
    const roomId = data.roomId;
    const room = rooms.get(roomId);
    
    if (!room) return;
    
    if (ws.role === 'broadcaster') {
        // من المذيع للمشاهدين
        room.viewers.forEach((viewer) => {
            if (viewer.readyState === 1) {
                viewer.send(JSON.stringify({
                    type: 'ice-candidate',
                    candidate: data.candidate,
                    roomId
                }));
            }
        });
    } else {
        // من المشاهد للمذيع
        room.broadcaster.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: data.candidate,
            viewerId: ws.viewerId
        }));
    }
}

function removeClient(ws) {
    if (!ws.roomId || !rooms.has(ws.roomId)) return;
    
    const room = rooms.get(ws.roomId);
    
    if (ws.role === 'broadcaster') {
        // أخبر المشاهدين أن البث انتهى
        room.viewers.forEach((viewer) => {
            if (viewer.readyState === 1) {
                viewer.send(JSON.stringify({ type: 'broadcast-ended' }));
            }
        });
        rooms.delete(ws.roomId);
    } else if (ws.role === 'viewer') {
        room.viewers.delete(ws.viewerId);
    }
}

server.listen(process.env.PORT || 3000, () => {
    console.log('✅ Server is running');
});
