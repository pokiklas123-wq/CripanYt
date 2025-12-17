const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

// تخزين بيانات البث
let activeBroadcasts = new Map(); // roomId -> {frames: [], audio: [], lastUpdate: Date}

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// صفحة المدرس
app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

// صفحة الطالب
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// المدرس يرسل إطار فيديو
app.post('/teacher/stream', (req, res) => {
    const { roomId, frame, audio } = req.body;
    
    if (!activeBroadcasts.has(roomId)) {
        activeBroadcasts.set(roomId, {
            frames: [],
            audio: [],
            lastUpdate: Date.now(),
            teacherActive: true
        });
    }
    
    const broadcast = activeBroadcasts.get(roomId);
    
    if (frame) {
        broadcast.frames.push(frame);
        // احتفظ بآخر 10 إطارات فقط
        if (broadcast.frames.length > 10) {
            broadcast.frames.shift();
        }
    }
    
    if (audio && audio.length > 0) {
        broadcast.audio.push(audio);
        // احتفظ بآخر 5 مقاطع صوتية فقط
        if (broadcast.audio.length > 5) {
            broadcast.audio.shift();
        }
    }
    
    broadcast.lastUpdate = Date.now();
    broadcast.teacherActive = true;
    
    res.json({ success: true, timestamp: Date.now() });
});

// الطالب يستقبل البث
app.get('/student/stream', (req, res) => {
    const { roomId } = req.query;
    
    if (!roomId || !activeBroadcasts.has(roomId)) {
        return res.json({
            status: 'waiting',
            message: 'لم يبدأ المدرس البث بعد'
        });
    }
    
    const broadcast = activeBroadcasts.get(roomId);
    const now = Date.now();
    
    // تحقق إذا كان المدرس لا يزال نشطاً (آخر تحديث قبل أقل من 10 ثواني)
    if (now - broadcast.lastUpdate > 10000) {
        broadcast.teacherActive = false;
        return res.json({
            status: 'ended',
            message: 'انتهى البث أو فقد الاتصال بالمدرس'
        });
    }
    
    // إرسال أحدث إطار وصوت
    res.json({
        status: 'active',
        frame: broadcast.frames.length > 0 ? broadcast.frames[broadcast.frames.length - 1] : null,
        audio: broadcast.audio.length > 0 ? broadcast.audio[broadcast.audio.length - 1] : null,
        timestamp: broadcast.lastUpdate,
        frameCount: broadcast.frames.length
    });
});

// المدرس يؤكد أنه لا يزال على اتصال
app.post('/teacher/heartbeat', (req, res) => {
    const { roomId } = req.body;
    
    if (roomId && activeBroadcasts.has(roomId)) {
        activeBroadcasts.get(roomId).lastUpdate = Date.now();
    }
    
    res.json({ success: true });
});

// تنظيف البث القديم (أكثر من 30 ثانية بدون تحديث)
setInterval(() => {
    const now = Date.now();
    for (const [roomId, broadcast] of activeBroadcasts.entries()) {
        if (now - broadcast.lastUpdate > 30000) {
            activeBroadcasts.delete(roomId);
            console.log(`تم تنظيف البث القديم: ${roomId}`);
        }
    }
}, 30000);

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على: http://localhost:${PORT}`);
    console.log(`🎓 صفحة المدرس: http://localhost:${PORT}/teacher`);
    console.log(`👥 صفحة الطلاب: http://localhost:${PORT}/student`);
});
