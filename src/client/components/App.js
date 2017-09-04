import React from 'react';
import Game from '../game';

// @prop state
// @ref gameFrame - Used to communicate messages to the game frame from other parts of the page (ex. NavBar).
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div>
        <p>Yo</p> 
        <Game/>
      </div>
    );
  }
}

class unused extends React.Component {
  constructor(props) {
    super(props);
  }
}

new unused();

export default App;