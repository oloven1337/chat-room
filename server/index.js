const express = require('express');
const http = require('http');
const cors = require('cors');
const { Socket } = require('socket.io');
const app = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

server.listen(4000, () => {
    console.log('server is running')
});

