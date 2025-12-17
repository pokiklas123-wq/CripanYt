// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// تخزين البث النشط
let activeBroadcast = null;
let viewers = new Set();

// إعدادات render.com
const PORT = process.env.PORT || 3000;

// خدمة الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));

// صفحة المدرس
app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'teacher.html'));
});

// صفحة الطلاب
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>منصة البث المباشر</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: rgba(255,255,255,0.1);
                    padding: 30px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                }
                h1 { color: white; }
                .btn {
                    display: block;
                    width: 80%;
                    margin: 20px auto;
                    padding: 20px;
                    background: white;
                    color: #667eea;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 20px;
                    font-weight: bold;
                }
                .btn:hover {
                    background: #f0f0f0;
                    transform: scale(1.05);
                }
                .teacher { border-right: 5px solid #4CAF50; }
                .student { border-right: 5px solid #2196F3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎓 منصة البث المباشر للتعليم</h1>
                <p>اختر دورك:</p>
                <a href="/teacher" class="btn teacher">👨‍🏫 الدخول كمدرس</a>
                <a href="/student" class="btn student">👥 الدخول كمشاهد</a>
                <p style="margin-top: 30px; color: rgba(255,255,255,0.8);">
                    📍 الموقع: https://cripanyt.onrender.com
                </p>
            </div>
        </body>
        </html>
    `);
});

// استقبال فريمات الفيديو
app.post('/api/stream', (req, res) => {
    const { frame, broadcastId } = req.body;
    
    if (frame && activeBroadcast && activeBroadcast.id === broadcastId) {
        // بث الفريم لجميع المشاهدين
        const message = JSON.stringify({
            type: 'video_frame',
            frame: frame,
            timestamp: Date.now()
        });
        
        viewers.forEach(viewer => {
            if (viewer.readyState === WebSocket.OPEN) {
                viewer.send(message);
            }
        });
        
        res.json({ success: true, viewers: viewers.size });
    } else {
        res.json({ success: false, error: 'No active broadcast' });
    }
});

// WebSocket للاتصال المباشر
wss.on('connection', (ws, req) => {
    console.log('🔗 اتصال جديد:', req.socket.remoteAddress);
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'register_teacher') {
                // تسجيل كمدرس
                ws.role = 'teacher';
                activeBroadcast = {
                    id: data.broadcastId,
                    teacher: ws,
                    startedAt: Date.now(),
                    title: data.title || 'بث مباشر'
                };
                
                console.log(`🎬 البث بدأ: ${data.broadcastId}`);
                
                ws.send(JSON.stringify({
                    type: 'teacher_registered',
                    broadcastId: data.broadcastId,
                    url: `https://cripanyt.onrender.com/student?room=${data.broadcastId}`
                }));
                
            } else if (data.type === 'register_viewer') {
                // تسجيل كمشاهد
                ws.role = 'viewer';
                ws.viewerId = Date.now() + Math.random().toString(36).substr(2, 9);
                viewers.add(ws);
                
                console.log(`👤 مشاهد جديد: ${ws.viewerId} (العدد: ${viewers.size})`);
                
                // إرسال معلومات البث
                ws.send(JSON.stringify({
                    type: 'viewer_registered',
                    viewerId: ws.viewerId,
                    broadcastTitle: activeBroadcast ? activeBroadcast.title : 'بث مباشر',
                    viewersCount: viewers.size
                }));
                
                // إذا كان هناك بث نشط
                if (activeBroadcast) {
                    ws.send(JSON.stringify({
                        type: 'broadcast_active',
                        title: activeBroadcast.title,
                        startedAt: activeBroadcast.startedAt
                    }));
                }
                
            } else if (data.type === 'audio_chunk' && ws.role === 'teacher') {
                // بث الصوت للمشاهدين
                viewers.forEach(viewer => {
                    if (viewer.readyState === WebSocket.OPEN) {
                        viewer.send(JSON.stringify({
                            type: 'audio_data',
                            data: data.chunk,
                            timestamp: Date.now()
                        }));
                    }
                });
                
            } else if (data.type === 'chat_message') {
                // إرسال رسالة الدردشة للجميع
                const chatMessage = JSON.stringify({
                    type: 'chat_message',
                    sender: data.sender || 'مجهول',
                    message: data.message,
                    time: new Date().toLocaleTimeString('ar-SA')
                });
                
                viewers.forEach(viewer => {
                    if (viewer.readyState === WebSocket.OPEN) {
                        viewer.send(chatMessage);
                    }
                });
                
                if (activeBroadcast && activeBroadcast.teacher) {
                    activeBroadcast.teacher.send(chatMessage);
                }
            }
            
        } catch (error) {
            console.error('❌ خطأ في معالجة الرسالة:', error);
        }
    });
    
    ws.on('close', () => {
        if (ws.role === 'teacher') {
            console.log('👨‍🏫 المدرس غادر - إنهاء البث');
            
            // إعلام المشاهدين
            viewers.forEach(viewer => {
                if (viewer.readyState === WebSocket.OPEN) {
                    viewer.send(JSON.stringify({
                        type: 'broadcast_ended',
                        message: 'انتهى البث المباشر'
                    }));
                }
            });
            
            activeBroadcast = null;
            viewers.clear();
            
        } else if (ws.role === 'viewer') {
            viewers.delete(ws);
            console.log(`👤 مشاهد غادر (العدد المتبقي: ${viewers.size})`);
        }
    });
    
    ws.on('error', (error) => {
        console.error('❌ خطأ في WebSocket:', error);
    });
});

// Health check لـ render.com
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        broadcast: activeBroadcast ? 'active' : 'inactive',
        viewers: viewers.size,
        uptime: process.uptime()
    });
});

// تشغيل الخادم
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 الخادم يعمل على: https://cripanyt.onrender.com`);
    console.log(`📞 Port: ${PORT}`);
    console.log(`🎓 Teacher: https://cripanyt.onrender.com/teacher`);
    console.log(`👥 Student: https://cripanyt.onrender.com/student`);
});

// إغلاق نظيف
process.on('SIGTERM', () => {
    console.log('🛑 إغلاق الخادم...');
    wss.close();
    server.close();
    process.exit(0);
});
