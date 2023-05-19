const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('hello', () => {
        console.log('Hello received from a user');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    http.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});