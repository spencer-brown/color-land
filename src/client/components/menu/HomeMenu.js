import React from 'react';

import { connectToGame } from '../../utils/io';
import { MenuConstants } from '../../ClientConstants';

// @prop changeMenuView
// @state connectingToGame
class HomeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectingToGame: false
    };
  }

  async playNowClicked() {
    this.setState({
      connectingToGame: true
    });

    await connectToGame('myname');
    this.props.changeMenuView({
      menuView: MenuConstants.IN_GAME
    });
  }

  render() {
    if (this.state.connectingToGame) {
      document.title = 'Color Land - Connecting...';
    } else {
      document.title = 'Color Land';
    }

    return (
      <div>
        <div className="menu-title">
          Color Land
        </div>
        { this.state.connectingToGame ?
          <div className="menu-connection-status">
            Connecting...
          </div> : 
          <div className="menu-options">
            <input type="text" placeholder="Your Name"/>
            <a className="menu-button  big-button" onClick={ this.playNowClicked.bind(this) }>Play Now!</a>
          </div>
        }
      </div>
    );
  }
}

export default HomeMenu;
