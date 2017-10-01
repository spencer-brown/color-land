/* global io */

import user from './user';


const socket = io.connect('localhost:3000');

function connect() {
  return new Promise((resolve) => {
    socket.on('connect', (id) => {
      user.id = id;
      resolve();
    });
  });
}

export function connectToServer() {
  return new Promise(async (resolve) => {
    // Establish a connection with the server.
    await connect();

    socket.emit('registerUser', 'testusername', resolve);
  });
}

export function connectToGame(username) {
  return new Promise(async (connected) => {
    socket.emit('registerUser', username, connected);
  });
}
