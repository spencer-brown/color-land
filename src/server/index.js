const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const PORT = 3000;

app.use('/', express.static('public'));

io.on('connection', (client) => {
  console.log('Client connected!');

  client.on('disconnect', () => {
    console.log('Lost \'em.');
  });
});

server.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
