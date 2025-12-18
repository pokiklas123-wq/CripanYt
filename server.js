const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ WebRTC Signaling Server is LIVE');
});

const wss = new WebSocket.Server({ server });
const rooms = new Map();

console.log('🚀 Starting WebRTC Signaling Server...');

wss.on('connection', (ws) => {
    console.log('✅ New client connected');

    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to signaling server'
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            switch (data.type) {
                case 'create-room':
                    if (!rooms.has(data.roomId)) {
                        rooms.set(data.roomId, new Set());
                    }
                    rooms.get(data.roomId).add(ws);
                    
                    ws.send(JSON.stringify({
                        type: 'room-created',
                        roomId: data.roomId
                    }));
                    
                    console.log(`✅ Room created: ${data.roomId}`);
                    break;

                case 'join-room':
                    if (rooms.has(data.roomId)) {
                        rooms.get(data.roomId).add(ws);
                        
                        ws.send(JSON.stringify({
                            type: 'room-joined',
                            roomId: data.roomId
                        }));
                        
                        // إعلام المديع بمشاهد جديد
                        rooms.get(data.roomId).forEach(client => {
                            if (client !== ws && client.readyState === 1) {
                                client.send(JSON.stringify({
                                    type: 'new-viewer',
                                    viewerId: data.viewerId || 'anonymous'
                                }));
                            }
                        });
                        
                        console.log(`👤 Viewer joined: ${data.roomId}`);
                    } else {
                        ws.send(JSON.stringify({
                            type: 'error',
                            message: 'Room not found. Make sure broadcaster has started the stream.'
                        }));
                    }
                    break;

                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    // إعادة توجيه الرسائل
                    const room = Array.from(rooms.entries()).find(([roomId, clients]) => 
                        clients.has(ws)
                    );
                    
                    if (room) {
                        const [roomId, clients] = room;
                        clients.forEach(client => {
                            if (client !== ws && client.readyState === 1) {
                                client.send(JSON.stringify(data));
                            }
                        });
                    }
                    break;

                case 'leave-room':
                    rooms.forEach((clients, roomId) => {
                        clients.delete(ws);
                        if (clients.size === 0) {
                            rooms.delete(roomId);
                        }
                    });
                    break;
            }
        } catch (error) {
            console.error('❌ Error:', error);
        }
    });

    ws.on('close', () => {
        console.log('🔌 Client disconnected');
        rooms.forEach((clients, roomId) => {
            clients.delete(ws);
            if (clients.size === 0) {
                rooms.delete(roomId);
            }
        });
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
