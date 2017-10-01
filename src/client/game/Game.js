import Board from '../../shared/game/board/board.js';

class Game {
  constructor() {}

  loadCanvas() {
    const canvas = document.getElementById('js-game-canvas');
    const ctx = canvas.getContext('2d');

    // ctx.clearRect(200, 200);

    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 20, 20, 20);

    let board = new Board(5,5);
    for(var i=0; i<5; i++) {
      for(var j=0; j<5; j++) {
        var t = board.getTile(i,j);
        ctx.fillStyle = 'white';
        ctx.fillRect(t.getX()*tileSize, t.getY()*tileSize, tileSize, tileSize);
        ctx.strokeStyle = 'rgba(0, 0, 0, .05)';
        ctx.strokeRect(t.getX()*tileSize, t.getY()*tileSize, tileSize, tileSize);
      }
    } 
  }
}

export default Game;