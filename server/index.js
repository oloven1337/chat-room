const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server} = require('socket.io');

const route = require('./route.js');
const { addUser, findUser } = require('./users');

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

        const { user } = addUser({ name, room });

        socket.emit('message', {
            data: {
                user: 'Admin',
                message: `Hey ${user.name}`
            }
        });

        socket.broadcast.to(user.room).emit('message', {
            data: {
                user: 'Admin',
                message: `${user.name} has joined`
            }
        });
    });

    socket.on('sendMessage', ({ messageValue, params }) => {
        const currentUser = findUser(params);

        if (currentUser) {
            io.to(currentUser.room).emit('message', {
                data: {
                    user: currentUser,
                    message: messageValue
                }
            })
        }
    })

    io.on('disconnect', () => {
        console.log('disconnect');
    })
})

server.listen(4000, () => {
    console.log('server is running');
});

