const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

// تخزين اتصالات المدرسين والطلاب
const teachers = new Map();
const students = new Map();

wss.on('connection', (ws, req) => {
    ws.id = Date.now() + Math.random().toString(36).substr(2, 9);
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(ws, data);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        // تنظيف عند إغلاق الاتصال
        if (ws.role === 'teacher' && teachers.has(ws.room)) {
            teachers.delete(ws.room);
            
            // إعلام الطلاب بأن البث انتهى
            if (students.has(ws.room)) {
                students.get(ws.room).forEach(student => {
                    if (student.readyState === WebSocket.OPEN) {
                        student.send(JSON.stringify({ type: 'broadcast_ended' }));
                    }
                });
                students.delete(ws.room);
            }
        }
        
        if (ws.role === 'student' && ws.room && students.has(ws.room)) {
            const roomStudents = students.get(ws.room);
            const index = roomStudents.findIndex(s => s.id === ws.id);
            if (index > -1) {
                roomStudents.splice(index, 1);
            }
        }
    });
});

function handleMessage(ws, data) {
    switch (data.type) {
        case 'register_teacher':
            ws.role = 'teacher';
            ws.room = data.roomId;
            teachers.set(data.roomId, ws);
            console.log(`📞 Teacher registered for room: ${data.roomId}`);
            
            // إعداد معالج للرسائل من المدرس
            ws.send(JSON.stringify({ 
                type: 'registered', 
                role: 'teacher',
                roomId: data.roomId 
            }));
            break;
            
        case 'register_student':
            ws.role = 'student';
            ws.room = data.roomId;
            
            if (!students.has(data.roomId)) {
                students.set(data.roomId, []);
            }
            students.get(data.roomId).push(ws);
            
            // إرسال تأكيد للطالب
            ws.send(JSON.stringify({ 
                type: 'registered', 
                role: 'student',
                roomId: data.roomId 
            }));
            
            console.log(`👥 Student joined room: ${data.roomId}, Total: ${students.get(data.roomId).length}`);
            break;
            
        case 'offer':
            // إرسال العرض من المدرس للطلاب
            if (students.has(data.roomId)) {
                students.get(data.roomId).forEach(student => {
                    if (student.readyState === WebSocket.OPEN) {
                        student.send(JSON.stringify({
                            type: 'offer',
                            sdp: data.sdp,
                            roomId: data.roomId
                        }));
                    }
                });
            }
            break;
            
        case 'answer':
            // إرسال الإجابة من الطالب للمدرس
            if (teachers.has(data.roomId)) {
                const teacher = teachers.get(data.roomId);
                if (teacher.readyState === WebSocket.OPEN) {
                    teacher.send(JSON.stringify({
                        type: 'answer',
                        sdp: data.sdp,
                        studentId: ws.id
                    }));
                }
            }
            break;
            
        case 'ice_candidate':
            // إرسال مرشح ICE
            if (data.target === 'teacher' && teachers.has(data.roomId)) {
                const teacher = teachers.get(data.roomId);
                if (teacher.readyState === WebSocket.OPEN) {
                    teacher.send(JSON.stringify({
                        type: 'ice_candidate',
                        candidate: data.candidate,
                        studentId: ws.id
                    }));
                }
            } else if (data.target === 'student' && students.has(data.roomId)) {
                students.get(data.roomId).forEach(student => {
                    if (student.readyState === WebSocket.OPEN) {
                        student.send(JSON.stringify({
                            type: 'ice_candidate',
                            candidate: data.candidate
                        }));
                    }
                });
            }
            break;
            
        case 'broadcast_status':
            // إرسال حالة البث للطلاب
            if (students.has(data.roomId)) {
                students.get(data.roomId).forEach(student => {
                    if (student.readyState === WebSocket.OPEN) {
                        student.send(JSON.stringify({
                            type: 'broadcast_status',
                            status: data.status
                        }));
                    }
                });
            }
            break;
    }
}

// مسارات الصفحات
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

app.get('/teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'teacher.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// البورت
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`
    ============================================
    🚀  الخادم يعمل على http://localhost:${PORT}
    ============================================
    🎓  صفحة المدرس: http://localhost:${PORT}/teacher
    👥  صفحة الطلاب: http://localhost:${PORT}/student
    ============================================
    `);
});
