import React from 'react';
import Game from '../game';
import { connect } from '../utils/io';

// @prop state
// @ref gameFrame - Used to communicate messages to the game frame from other parts of the page (ex. NavBar).
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false
    };
  }

  async componentDidMount() {
    await connect();
    this.setState({ connected: true });
  }

  render() {    
    return (
      <div>
        {this.state.connected ?
          <Game/>
          :
          <div>
            <h1>Loading...</h1>
          </div>
        }
      </div>
    );
  }
}

export default App;
