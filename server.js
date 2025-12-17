// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// تخزين البث النشط
let activeBroadcast = null;
let viewers = new Set();

// خدمة الملفات الثابتة
app.use(express.static(__dirname));
app.use(express.json({ limit: '50mb' }));

// صفحة المدرس
app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

// صفحة الطلاب
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// استقبال فريمات الفيديو من المدرس
app.post('/stream', (req, res) => {
    if (req.body.frame) {
        // بث الفريم لجميع المشاهدين
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.role === 'viewer') {
                client.send(JSON.stringify({
                    type: 'video_frame',
                    frame: req.body.frame,
                    timestamp: Date.now()
                }));
            }
        });
    }
    res.send({ status: 'ok' });
});

// WebSocket للتواصل المباشر
wss.on('connection', (ws, req) => {
    console.log('مستخدم جديد متصل');
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'register_teacher') {
            ws.role = 'teacher';
            activeBroadcast = {
                id: data.broadcastId,
                teacher: ws,
                startedAt: Date.now()
            };
            console.log('المدرس بدأ البث:', data.broadcastId);
            
        } else if (data.type === 'register_viewer') {
            ws.role = 'viewer';
            viewers.add(ws);
            console.log('مشاهد جديد. العدد:', viewers.size);
            
            // إرسال معلومات البث للمشاهد
            if (activeBroadcast) {
                ws.send(JSON.stringify({
                    type: 'broadcast_info',
                    status: 'active',
                    viewers: viewers.size
                }));
            }
            
        } else if (data.type === 'audio_chunk' && ws.role === 'teacher') {
            // بث الصوت للمشاهدين
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN && client.role === 'viewer') {
                    client.send(JSON.stringify({
                        type: 'audio_data',
                        data: data.chunk
                    }));
                }
            });
        }
    });
    
    ws.on('close', () => {
        if (ws.role === 'teacher') {
            console.log('المدرس غادر - إنهاء البث');
            activeBroadcast = null;
            
            // إعلام جميع المشاهدين
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN && client.role === 'viewer') {
                    client.send(JSON.stringify({
                        type: 'broadcast_ended'
                    }));
                }
            });
        } else if (ws.role === 'viewer') {
            viewers.delete(ws);
            console.log('مشاهد غادر. العدد المتبقي:', viewers.size);
        }
    });
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على: http://localhost:${PORT}`);
    console.log(`🎓 صفحة المدرس: http://localhost:${PORT}/teacher`);
    console.log(`👥 صفحة الطلاب: http://localhost:${PORT}/student`);
});
