const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Utils = require('../shared/utils');
const userManager = require('./UserManager');

const PORT = 3000;

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected!');

  socket.user = userManager.addUser();

  socket.on('disconnect', () => {
    console.log('Lost \'em.');

    userManager.removeUser(socket.user.id);
  });

  socket.on('registerUser', (username, cb) => {
    console.log('TODO: Register user.');

    if (Utils.validUsername(username)) {
      socket.username = username;
      cb(true /* Valid username. */, socket.user.id);
    } else {
      cb(false /* Invalid username. */);
    }
  });
});

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
