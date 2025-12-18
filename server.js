// server.js - WebSocket Signaling Server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

const rooms = new Map(); // roomId -> Set of connections

wss.on('connection', (ws) => {
    console.log('New client connected');
    let currentRoom = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data);

            switch (data.type) {
                case 'create-room':
                    // إنشاء غرفة جديدة
                    if (!rooms.has(data.roomId)) {
                        rooms.set(data.roomId, new Set());
                    }
                    rooms.get(data.roomId).add(ws);
                    currentRoom = data.roomId;
                    ws.send(JSON.stringify({ type: 'room-created', roomId: data.roomId }));
                    console.log(`Room created: ${data.roomId}`);
                    break;

                case 'join-room':
                    // الانضمام إلى غرفة موجودة
                    if (rooms.has(data.roomId)) {
                        rooms.get(data.roomId).add(ws);
                        currentRoom = data.roomId;
                        ws.send(JSON.stringify({ type: 'room-joined', roomId: data.roomId }));
                        
                        // إعلام المديع بمشاهد جديد
                        rooms.get(data.roomId).forEach(client => {
                            if (client !== ws && client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({ 
                                    type: 'new-viewer', 
                                    viewerId: data.viewerId || 'anonymous' 
                                }));
                            }
                        });
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
                    }
                    break;

                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    // إعادة توجيه رسائل WebRTC إلى جميع الأطراف الأخرى في الغرفة
                    if (currentRoom && rooms.has(currentRoom)) {
                        rooms.get(currentRoom).forEach(client => {
                            if (client !== ws && client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(data));
                            }
                        });
                    }
                    break;

                case 'leave-room':
                    // مغادرة الغرفة
                    if (currentRoom && rooms.has(currentRoom)) {
                        rooms.get(currentRoom).delete(ws);
                        if (rooms.get(currentRoom).size === 0) {
                            rooms.delete(currentRoom);
                        }
                        currentRoom = null;
                    }
                    break;
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        if (currentRoom && rooms.has(currentRoom)) {
            rooms.get(currentRoom).delete(ws);
            if (rooms.get(currentRoom).size === 0) {
                rooms.delete(currentRoom);
            }
        }
    });
});

console.log(`WebSocket server running on port ${process.env.PORT || 8080}`);
