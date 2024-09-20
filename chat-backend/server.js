const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());

//For WebSocket connection
io.on('connection', (socket) => {
    console.log('A User has connected:', socket.id);

    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});