/* global io */

import user from './user';


const socket = io.connect('localhost:3000');

function connect() {
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve();
    });
  });
}

export function connectToServer() {
  return new Promise(async (resolve) => {
    // Establish a connection with the server.
    await connect();

    socket.emit('registerUser', user.id, resolve);
  });
}
