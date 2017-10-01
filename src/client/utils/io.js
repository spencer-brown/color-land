/* global io */

export function connect() {
  return new Promise((resolve) => {
    const socket = io.connect('localhost:3000');
    socket.on('connect', () => {
      resolve();
    });
  });
}
