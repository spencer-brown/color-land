const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const userManager = require('./UserManager');

const PORT = 3000;

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected!');

  socket.on('disconnect', () => {
    console.log('Lost \'em.');

    userManager.removeUser(this.socket.user.id);
  });

  socket.on('registerUser', (cb) => {
    console.log('TODO: Register user.');

    this.socket.user = userManager.addUser();

    cb(this.socket.user.id);
  });
});

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
