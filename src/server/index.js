const server = require('http').createServer();
const io = require('socket.io')(server);


const PORT = 3000;

io.on('connection', (client) => {
  console.log('Client connected!');

  client.on('disconnect', () => {
    console.log('Lost \'em.');
  });
});

server.listen(PORT);
console.log('Listening on port', PORT);
