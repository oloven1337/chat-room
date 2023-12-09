const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server} = require('socket.io');

const route = require('./route.js');

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        console.log(123)
        socket.emit('message', {
            data: {
                user: 'Admin',
                message: `Hey ${name}`
            }
        });
    });

    io.on('disconnect', () => {
        console.log('disconnect');
    })
})

server.listen(4000, () => {
    console.log('server is running');
});

