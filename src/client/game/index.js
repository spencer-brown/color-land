import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div>
        <p>Game render</p>
        <canvas></canvas>
      </div>
    );
  }
}

export default Game;