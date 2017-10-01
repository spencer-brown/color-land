import React from 'react';
import Board from '../../shared/game/board/board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = document.getElementById('js-game-canvas');
    const ctx = canvas.getContext('2d');
    const tileSize = 50;
    // ctx.clearRect(200, 200);
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

  render() {    
    return (
      <div>
        <p>Game render</p>
        <canvas id="js-game-canvas"></canvas>
      </div>
    );
  }
}

export default Game;