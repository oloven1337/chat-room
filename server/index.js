const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server} = require('socket.io');

const route = require('./route.js');
const { addUser, findUser, removeUser } = require('./database/users');

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
        const { user, isExist } = addUser({ name, room });
        socket.join(room);

        const userMessage = isExist
            ? `${user.name}, here you go again`
            : `Hey ${user.name}`;

        socket.emit('message', {
            data: {
                user: 'Admin',
                message: userMessage
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

    socket.on('leftRoom', ({ params }) => {
        const user = removeUser(params);

        if (user) {
            const {room, name} = user;

            io.to(room).emit(
                'message', {
                    data: {
                        user: {name: 'Admin'},
                        message: `${name} has left`
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

