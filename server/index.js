const express = require('express');
const http = require('http');
const cors = require('cors');
const route = require('./route.js');
const { Socket } = require('socket.io');

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);
// const io = new Socket(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"]
//     }
// });

server.listen(4000, () => {
    console.log('server is running')
});

