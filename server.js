const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(__dirname));

const users = {}; // تخزين جميع المستخدمين

io.on('connection', (socket) => {
  console.log('✅ مستخدم متصل:', socket.id);
  users[socket.id] = { socketId: socket.id };

  // 1. انضم إلى غرفة
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    users[socket.id].roomId = roomId;
    users[socket.id].userId = userId;
    
    console.log(`👤 ${userId} انضم للغرفة ${roomId}`);
    
    // إعلام الآخرين في الغرفة
    socket.to(roomId).emit('user-connected', userId, socket.id);
    
    // إرسال قائمة المستخدمين الحاليين
    const roomUsers = Object.values(users)
      .filter(u => u.roomId === roomId)
      .map(u => ({ userId: u.userId, socketId: u.socketId }));
    
    io.to(roomId).emit('room-users', roomUsers);
  });

  // 2. نقل إشارات WebRTC بين المستخدمين
  socket.on('signal', (data) => {
    const { to, signal, from, type } = data;
    console.log(`📡 إشارة ${type} من ${from} إلى ${to}`);
    
    if (users[to]) {
      io.to(to).emit('signal', {
        from: socket.id,
        to: to,
        signal: signal,
        type: type
      });
    }
  });

  // 3. عند المغادرة
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user && user.roomId) {
      socket.to(user.roomId).emit('user-disconnected', socket.id);
      delete users[socket.id];
      console.log(`❌ ${socket.id} غادر`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل: http://localhost:${PORT}`);
});
