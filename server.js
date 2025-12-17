const express = require('express');
const app = express();
const path = require('path');

// تخزين البث النشط
let activeBroadcast = null;
let broadcastData = {
    frame: null,
    lastUpdate: null,
    teacherActive: false
};

app.use(express.json());
app.use(express.static(__dirname));

// جميع الصفحات
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// المدرس يرسل صورة
app.post('/send-frame', (req, res) => {
    const { frame, roomId } = req.body;
    
    broadcastData.frame = frame;
    broadcastData.lastUpdate = Date.now();
    broadcastData.teacherActive = true;
    
    res.json({ success: true, time: new Date().toLocaleTimeString() });
});

// الطالب يجلب الصورة
app.get('/get-frame', (req, res) => {
    const { roomId } = req.query;
    
    if (!broadcastData.teacherActive) {
        return res.json({ 
            status: 'waiting', 
            message: 'انتظر حتى يبدأ المدرس البث' 
        });
    }
    
    // إذا مر أكثر من 10 ثواني بدون تحديث
    if (Date.now() - broadcastData.lastUpdate > 10000) {
        broadcastData.teacherActive = false;
        return res.json({ 
            status: 'ended', 
            message: 'انتهى البث' 
        });
    }
    
    res.json({
        status: 'active',
        frame: broadcastData.frame,
        lastUpdate: broadcastData.lastUpdate
    });
});

// التحقق من حالة المدرس
app.post('/teacher-alive', (req, res) => {
    const { roomId } = req.body;
    broadcastData.lastUpdate = Date.now();
    broadcastData.teacherActive = true;
    res.json({ alive: true });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ السيرفر يعمل على: http://localhost:${PORT}`);
    console.log(`🎓 المدرس: http://localhost:${PORT}/teacher`);
    console.log(`👥 الطلاب: http://localhost:${PORT}/student`);
});
