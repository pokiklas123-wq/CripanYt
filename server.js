// ============================================================
// P2P Voice Relay Server - WebSocket Version
// For Render.com (Free Tier)
// ============================================================

const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

// خريطة الغرف
// كل غرفة: { host: WebSocket, client: WebSocket, createdAt: Date }
const rooms = new Map();

console.log(`🎙️ Voice Relay Server starting on port ${PORT}...`);

// إنشاء خادم WebSocket
const wss = new WebSocket.Server({ port: PORT, host: '0.0.0.0' });

wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`[+] New connection from ${clientIp}`);

    let currentRoom = null;
    let currentRole = null;
    let isRegistered = false;

    // ضبط WebSocket
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    ws.on('message', (data) => {
        // ============ مرحلة التسجيل ============
        if (!isRegistered) {
            let message;
            try {
                // محاولة قراءة كـ نص
                message = data.toString('utf8').trim();
            } catch (e) {
                return;
            }

            // التنسيق المتوقع: ROOM:roomId:ROLE
            if (!message.startsWith('ROOM:')) {
                console.log(`[!] Invalid registration from ${clientIp}: ${message}`);
                ws.close(4000, 'Invalid registration');
                return;
            }

            const parts = message.split(':');
            if (parts.length !== 3) {
                console.log(`[!] Malformed registration: ${message}`);
                ws.close(4001, 'Malformed registration');
                return;
            }

            currentRoom = parts[1].trim();
            currentRole = parts[2].trim().toUpperCase();

            if (currentRole !== 'HOST' && currentRole !== 'CLIENT') {
                console.log(`[!] Invalid role: ${currentRole}`);
                ws.close(4002, 'Invalid role');
                return;
            }

            // إنشاء الغرفة إذا لم تكن موجودة
            if (!rooms.has(currentRoom)) {
                rooms.set(currentRoom, {
                    host: null,
                    client: null,
                    createdAt: Date.now()
                });
                console.log(`[+] Room created: ${currentRoom}`);
            }

            const room = rooms.get(currentRoom);

            // منع الازدواجية (إذا كان الدور مشغولاً)
            if (currentRole === 'HOST' && room.host) {
                console.log(`[!] Room ${currentRoom} already has a HOST`);
                ws.close(4003, 'Host already exists');
                return;
            }
            if (currentRole === 'CLIENT' && room.client) {
                console.log(`[!] Room ${currentRoom} already has a CLIENT`);
                ws.close(4004, 'Client already exists');
                return;
            }

            // تسجيل الدور
            if (currentRole === 'HOST') {
                room.host = ws;
            } else {
                room.client = ws;
            }

            isRegistered = true;
            console.log(`[✓] ${currentRole} registered in room ${currentRoom}`);

            // إذا اكتمل الطرفان، أبلغهما
            if (room.host && room.client) {
                console.log(`[✓✓] Room ${currentRoom} is complete — notifying both peers`);
                try {
                    room.host.send('READY');
                    room.client.send('READY');
                } catch (e) {
                    console.log(`[!] Failed to notify peers: ${e.message}`);
                }
            }
            return;
        }

        // ============ مرحلة نقل البيانات (بعد التسجيل) ============
        const room = rooms.get(currentRoom);
        if (!room) return;

        // تحديد الطرف الآخر
        const other = (currentRole === 'HOST') ? room.client : room.host;

        // تمرير البيانات كما هي (binary)
        if (other && other.readyState === WebSocket.OPEN) {
            try {
                other.send(data);
            } catch (e) {
                console.log(`[!] Relay error: ${e.message}`);
            }
        }
    });

    ws.on('error', (err) => {
        console.log(`[!] WebSocket error (${currentRole || '?'}@${currentRoom || '?'}): ${err.message}`);
    });

    ws.on('close', (code, reason) => {
        console.log(`[-] ${currentRole || '?'} disconnected from room ${currentRoom || '?'} (code: ${code})`);

        if (currentRoom && rooms.has(currentRoom)) {
            const room = rooms.get(currentRoom);

            // أبلغ الطرف الآخر
            const other = (currentRole === 'HOST') ? room.client : room.host;
            if (other && other.readyState === WebSocket.OPEN) {
                try { other.send('PEER_LEFT'); } catch (e) {}
            }

            // إزالة الطرف
            if (currentRole === 'HOST') room.host = null;
            if (currentRole === 'CLIENT') room.client = null;

            // حذف الغرفة إذا كانت فارغة
            if (!room.host && !room.client) {
                rooms.delete(currentRoom);
                console.log(`[x] Room ${currentRoom} deleted (empty)`);
            }
        }
    });
});

// ============================================================
// Heartbeat: كشف الاتصالات الميتة كل 30 ثانية
// ============================================================
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log(`[!] Terminating dead connection`);
            return ws.terminate();
        }
        ws.isAlive = false;
        try { ws.ping(); } catch (e) {}
    });
}, 30000);

// ============================================================
// تنظيف الغرف القديمة (أكثر من 30 دقيقة)
// ============================================================
setInterval(() => {
    const now = Date.now();
    for (const [roomId, room] of rooms.entries()) {
        if (now - room.createdAt > 1800000) {
            console.log(`[x] Room ${roomId} expired (30 min)`);
            if (room.host) try { room.host.close(4005, 'Room expired'); } catch (e) {}
            if (room.client) try { room.client.close(4005, 'Room expired'); } catch (e) {}
            rooms.delete(roomId);
        }
    }
}, 60000);

// ============================================================
// سجل عند الإغلاق
// ============================================================
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received — closing server...');
    wss.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

console.log(`✅ Voice Relay Server ready on port ${PORT}`);
console.log(`📡 Waiting for WebSocket connections...`);
