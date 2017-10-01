import React from 'react';


// @prop changeMenuView
// @state connectingToGame
class HomeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectingToGame: false
    };
  }

  playNowClicked() {
    console.log('Play now!');

    this.setState({
      connectingToGame: true
    });

    // TODO: Make a request to web socket.
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
