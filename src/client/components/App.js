import React from 'react';

import { connectToServer } from '../utils/io';
import Game from '../game/Game';
import HomeMenu from './menu/HomeMenu';
import { MenuConstants } from '../ClientConstants';


// @state menuView
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false
    };
  }

  async componentDidMount() {
    window.game = new Game();
    window.game.loadCanvas();

    await connectToServer();
    this.setState({
      connected: true,
      menuView: MenuConstants.HOME
    });
  }

  changeMenuView(newMenuView) {
    this.setState({
      menuView: newMenuView
    });
  }

  render() {  
    let menuToShow = '';
    switch(this.state.menuView) {
      case MenuConstants.HOME:
        menuToShow = (<HomeMenu changeMenuView={this.changeMenuView.bind(this)}/>);
        break;
      case MenuConstants.IN_GAME:
        // Blank.
        break;
    }

    return (
      <div>
        {this.state.connected ?
          <div>
            { menuToShow }
          </div> :
          <div>
            <h1>Loading...</h1>
          </div>
        }
        
        <canvas id="js-game-canvas"></canvas>
      </div>
    );
  }
}

export default App;
