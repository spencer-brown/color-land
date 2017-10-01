const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const PORT = 3000;

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected!');

  socket.on('disconnect', () => {
    console.log('Lost \'em.');
  });

  socket.on('registerUser', (userId, cb) => {
    console.log('TODO: Register user.');

    cb();
  });
});

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
