import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = document.getElementById('js-game-canvas');
    const ctx = canvas.getContext('2d');

    // ctx.clearRect(200, 200);

    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 20, 20, 20);
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