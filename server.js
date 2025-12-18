// server.js - WebRTC Signaling Server
const WebSocket = require('ws');
const http = require('http');

// Create HTTP server for health checks
const server = http.createServer((req, res) => {
    // Allow CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            timestamp: new Date().toISOString(),
            activeRooms: rooms.size,
            server: 'WebRTC Signaling Server'
        }));
        return;
    }
    
    res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });
    res.end('WebRTC Signaling Server is running\nUse WebSocket connection at ws://' + req.headers.host);
});

// WebSocket server
const wss = new WebSocket.Server({ 
    server,
    clientTracking: true,
    handleProtocols: (protocols) => {
        console.log('Client protocols:', protocols);
        return 'webrtc';
    }
});

// Store rooms and connections
const rooms = new Map(); // roomId -> Set of WebSocket connections
const clientInfo = new WeakMap(); // WebSocket -> client info

console.log('🚀 Starting WebRTC Signaling Server...');

wss.on('connection', (ws, req) => {
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const clientIp = req.socket.remoteAddress;
    
    console.log(`✅ New connection: ${clientId} from ${clientIp}`);
    
    // Store client info
    clientInfo.set(ws, {
        id: clientId,
        ip: clientIp,
        roomId: null,
        role: null,
        connectedAt: new Date()
    });
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        clientId: clientId,
        message: 'Connected to WebRTC signaling server',
        timestamp: Date.now(),
        server: 'cripanyt-signaling-v2'
    }));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message.toString());
            const info = clientInfo.get(ws);
            
            console.log(`📩 [${info?.id}] ${data.type}`, data.roomId ? `room: ${data.roomId}` : '');
            
            switch (data.type) {
                case 'create-room':
                    handleCreateRoom(ws, data);
                    break;
                    
                case 'join-room':
                    handleJoinRoom(ws, data);
                    break;
                    
                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    handleWebRTCMessage(ws, data);
                    break;
                    
                case 'ping':
                    ws.send(JSON.stringify({
                        type: 'pong',
                        timestamp: Date.now(),
                        clientId: info?.id
                    }));
                    break;
                    
                case 'leave-room':
                    handleLeaveRoom(ws);
                    break;
                    
                default:
                    console.warn(`Unknown message type: ${data.type}`);
            }
        } catch (error) {
            console.error('❌ Error processing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Invalid message format',
                error: error.message
            }));
        }
    });
    
    ws.on('error', (error) => {
        console.error(`❌ WebSocket error for ${clientId}:`, error);
    });
    
    ws.on('close', () => {
        const info = clientInfo.get(ws);
        console.log(`🔌 Connection closed: ${info?.id} (${info?.role || 'unknown'})`);
        handleLeaveRoom(ws);
        clientInfo.delete(ws);
    });
});

// Room management functions
function handleCreateRoom(ws, data) {
    const info = clientInfo.get(ws);
    const roomId = data.roomId;
    
    if (!roomId || roomId.trim().length === 0) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room ID is required'
        }));
        return;
    }
    
    if (rooms.has(roomId)) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room already exists'
        }));
        return;
    }
    
    // Create new room
    rooms.set(roomId, new Set([ws]));
    info.roomId = roomId;
    info.role = 'broadcaster';
    
    console.log(`🎬 Room created: ${roomId} by ${info.id}`);
    
    // Notify creator
    ws.send(JSON.stringify({
        type: 'room-created',
        roomId: roomId,
        message: 'Room created successfully. Share this room ID with viewers.',
        timestamp: Date.now(),
        clientCount: 1
    }));
}

function handleJoinRoom(ws, data) {
    const info = clientInfo.get(ws);
    const roomId = data.roomId;
    
    if (!roomId || roomId.trim().length === 0) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room ID is required'
        }));
        return;
    }
    
    if (!rooms.has(roomId)) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room not found. Make sure the broadcaster has started streaming.'
        }));
        return;
    }
    
    // Check if room is full (optional limit)
    const room = rooms.get(roomId);
    if (room.size >= 50) { // Limit to 50 viewers per room
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room is full (max 50 viewers)'
        }));
        return;
    }
    
    // Add viewer to room
    room.add(ws);
    info.roomId = roomId;
    info.role = 'viewer';
    
    console.log(`👤 Viewer joined: ${info.id} to room ${roomId} (Total: ${room.size})`);
    
    // Notify viewer
    ws.send(JSON.stringify({
        type: 'room-joined',
        roomId: roomId,
        message: 'Successfully joined room',
        timestamp: Date.now(),
        clientCount: room.size
    }));
    
    // Notify broadcaster about new viewer
    room.forEach(client => {
        const clientInfoData = clientInfo.get(client);
        if (clientInfoData && clientInfoData.role === 'broadcaster') {
            client.send(JSON.stringify({
                type: 'new-viewer',
                viewerId: info.id,
                timestamp: Date.now(),
                totalViewers: room.size - 1 // Exclude broadcaster
            }));
        }
    });
}

function handleWebRTCMessage(ws, data) {
    const info = clientInfo.get(ws);
    const roomId = info?.roomId;
    
    if (!roomId || !rooms.has(roomId)) {
        console.warn(`Message from ${info?.id} but no active room`);
        return;
    }
    
    // Forward message to all other clients in the room
    const room = rooms.get(roomId);
    room.forEach(client => {
        if (client !== ws && client.readyState === 1) { // OPEN state
            // Add sender info for proper routing
            const messageWithSender = {
                ...data,
                senderId: info.id,
                senderRole: info.role
            };
            client.send(JSON.stringify(messageWithSender));
        }
    });
}

function handleLeaveRoom(ws) {
    const info = clientInfo.get(ws);
    if (!info || !info.roomId) return;
    
    const roomId = info.roomId;
    if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.delete(ws);
        
        console.log(`🚪 ${info.role} left room ${roomId}. Remaining: ${room.size}`);
        
        if (room.size === 0) {
            // Room is empty, delete it
            rooms.delete(roomId);
            console.log(`🗑️ Room deleted: ${roomId} (empty)`);
        } else if (info.role === 'broadcaster') {
            // Broadcaster left, notify all viewers
            room.forEach(client => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({
                        type: 'broadcaster-left',
                        message: 'Broadcaster has ended the stream',
                        timestamp: Date.now()
                    }));
                }
            });
        }
        
        info.roomId = null;
        info.role = null;
    }
}

// Health check interval
setInterval(() => {
    console.log(`📊 Server Stats - Rooms: ${rooms.size}, Total Clients: ${wss.clients.size}`);
    
    rooms.forEach((clients, roomId) => {
        let broadcasterCount = 0;
        let viewerCount = 0;
        
        clients.forEach(client => {
            const info = clientInfo.get(client);
            if (info?.role === 'broadcaster') broadcasterCount++;
            else if (info?.role === 'viewer') viewerCount++;
        });
        
        console.log(`   📍 ${roomId}: ${broadcasterCount} broadcaster, ${viewerCount} viewers`);
    });
}, 60000); // Log every minute

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 WebSocket URL: ws://localhost:${PORT}`);
    console.log(`🌐 HTTP URL: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
