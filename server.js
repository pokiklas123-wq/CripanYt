// ============================================================
//  Multi-Player Voice Relay Server (WebSocket)
//  يدعم غرف بأي عدد لاعبين (مثالي لـ 10) + كتم فردي عبر UID
//  Hosted on: cripanyt.onrender.com
//  ✅ محسّن ليدعم 10 أشخاص في الغرفة بدون مشاكل
// ============================================================

const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;

// rooms: Map<roomId, { players: Map<uid, { ws, name, muted }>, createdAt }>
const rooms = new Map();

console.log(`🎙️ Multi-Voice Relay starting on port ${PORT}...`);
console.log(`🎙️ Supports unlimited players per room (ideal for 10 players)`);

const wss = new WebSocket.Server({ 
    port: PORT, 
    host: '0.0.0.0',
    maxPayload: 1024 * 1024, // 1MB لدعم بث صوتي بجودة عالية
    perMessageDeflate: false // تعطيل الضغط لتقليل التأخير
});

wss.on('connection', (ws, req) => {
    const clientIp = (req.socket && req.socket.remoteAddress) || 'unknown';
    console.log(`[+] New connection from ${clientIp}`);

    let currentRoomId = null;
    let currentUid = null;
    let currentName = null;
    let isRegistered = false;

    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    ws.on('message', (data, isBinary) => {

        // ═══════════════════════════════════════════
        //  مرحلة التسجيل
        //  التنسيق: ROOM:<roomId>:JOIN:<uid>:<name>
        // ═══════════════════════════════════════════
        if (!isRegistered) {
            let message;
            try { message = data.toString('utf8').trim(); }
            catch (e) { return; }

            if (!message.startsWith('ROOM:')) {
                ws.close(4000, 'Invalid registration');
                return;
            }

            const parts = message.split(':');
            if (parts.length < 5 || parts[2] !== 'JOIN') {
                ws.close(4001, 'Malformed registration');
                return;
            }

            currentRoomId = parts[1].trim();
            currentUid = parts[3].trim();
            currentName = parts.slice(4).join(':').trim() || 'Player';

            if (!currentRoomId || !currentUid) {
                ws.close(4001, 'Malformed registration');
                return;
            }

            if (!rooms.has(currentRoomId)) {
                rooms.set(currentRoomId, { players: new Map(), createdAt: Date.now() });
                console.log(`[+] Room created: ${currentRoomId}`);
            }

            const room = rooms.get(currentRoomId);

            // إذا كان نفس uid موجوداً (reconnect)، استبدل القديم
            if (room.players.has(currentUid)) {
                const old = room.players.get(currentUid);
                try { old.ws.close(4006, 'Replaced'); } catch (e) {}
                room.players.delete(currentUid);
            }

            room.players.set(currentUid, { ws, name: currentName, muted: false });
            isRegistered = true;

            console.log(`[✓] ${currentUid} (${currentName}) joined ${currentRoomId} — total: ${room.players.size}`);

            // أرسل قائمة اللاعبين الحاليين إلى الوافد الجديد
            const existingPeers = [];
            for (const [uid, p] of room.players) {
                if (uid !== currentUid) {
                    existingPeers.push({ uid, name: p.name, muted: p.muted });
                }
            }
            try {
                ws.send('PEERS:' + JSON.stringify(existingPeers));
                ws.send('READY');
            } catch (e) {}

            // أبلغ الآخرين
            broadcastToRoom(room, currentUid,
                'PEER_JOINED:' + encodeURIComponent(currentUid) + ':' + encodeURIComponent(currentName));

            return;
        }

        // ═══════════════════════════════════════════
        //  مرحلة نقل البيانات (بعد التسجيل)
        // ═══════════════════════════════════════════

        const room = rooms.get(currentRoomId);
        if (!room) return;

        // رسائل نصية تحكمية
        if (!isBinary) {
            let txt;
            try { txt = data.toString('utf8').trim(); } catch (e) { return; }

            if (txt === 'MUTE') {
                const me = room.players.get(currentUid);
                if (me) me.muted = true;
                broadcastToRoom(room, currentUid,
                    'MUTE_STATE:' + encodeURIComponent(currentUid) + ':1');
                return;
            }
            if (txt === 'UNMUTE') {
                const me = room.players.get(currentUid);
                if (me) me.muted = false;
                broadcastToRoom(room, currentUid,
                    'MUTE_STATE:' + encodeURIComponent(currentUid) + ':0');
                return;
            }
            if (txt === 'LEAVE') {
                handleLeave();
                return;
            }
            return;
        }

        // ─── بيانات صوتية (binary) ───
        // تنسيق البث: [1 byte uidLen][uidLen bytes uid][PCM packet]
        const me = room.players.get(currentUid);
        if (me && me.muted) return; // المايك مكتوم — لا تبث

        const uidBytes = Buffer.from(currentUid, 'utf8');
        if (uidBytes.length > 250) return; // حماية
        const lenBuf = Buffer.from([uidBytes.length]);
        const prefixed = Buffer.concat([lenBuf, uidBytes, data]);

        for (const [uid, p] of room.players) {
            if (uid === currentUid) continue;
            if (p.ws.readyState === WebSocket.OPEN) {
                try { p.ws.send(prefixed); } catch (e) {}
            }
        }
    });

    ws.on('error', (err) => {
        console.log(`[!] ws error (${currentUid || '?'}@${currentRoomId || '?'}): ${err.message}`);
    });

    ws.on('close', (code, reason) => {
        console.log(`[-] ${currentUid || '?'} disconnected from ${currentRoomId || '?'} (code ${code})`);
        handleLeave();
    });

    function handleLeave() {
        if (!currentRoomId || !currentUid) return;
        const room = rooms.get(currentRoomId);
        if (!room) return;

        if (room.players.has(currentUid) && room.players.get(currentUid).ws === ws) {
            room.players.delete(currentUid);
            broadcastToRoom(room, currentUid,
                'PEER_LEFT:' + encodeURIComponent(currentUid));
        }

        if (room.players.size === 0) {
            rooms.delete(currentRoomId);
            console.log(`[x] Room ${currentRoomId} deleted (empty)`);
        }

        currentRoomId = null;
        currentUid = null;
    }
});

function broadcastToRoom(room, exceptUid, text) {
    for (const [uid, p] of room.players) {
        if (uid === exceptUid) continue;
        if (p.ws.readyState === WebSocket.OPEN) {
            try { p.ws.send(text); } catch (e) {}
        }
    }
}

// Heartbeat
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        try { ws.ping(); } catch (e) {}
    });
}, 30000);

// تنظيف الغرف الفارغة
setInterval(() => {
    for (const [roomId, room] of rooms.entries()) {
        if (room.players.size === 0) {
            console.log(`[x] Room ${roomId} expired (empty)`);
            rooms.delete(roomId);
        }
    }
}, 60000);

process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM — closing');
    wss.close(() => process.exit(0));
});

console.log(`✅ Multi-Voice Relay ready on port ${PORT}`);
console.log(`✅ Supports 10 players per room without issues`);
