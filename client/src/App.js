import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container';
import Utils from './utils';

class App extends Component {

  constructor(props) {
    super(props);
    Utils.getNewAccessToken();
    Utils.saveAccessToken();
  }

  componentDidMount() {

    Utils.getUserInfo().then(user => {
      this.setState({user});
    });   
  }

  render() {
    const variable = "Hello, WOrld";
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title title">{(this.state && this.state.user && this.state.user.display_name != undefined) ? this.state.user.display_name + `'s` : 'Spotify'} Top Tracks & Artists</h1> 
        </header>
        <div className="App-intro">
         <div className="cta-container">
         <div className="cta">
         <div className="cta-child cta-title">Built by <a href="http://bonganimbigi.com">@bongani</a></div>
         {(!Utils.hasToken()) ? 
            <a href='https://spotifytoptracks.herokuapp.com/login'  className="cta-child btn">Login</a>
            : 
            <a onClick={()=> Utils.createPlaylist()}  className="cta-child btn">Create Playlist</a>
          }
          </div>
         </div>
         <div>
           {(Utils.hasToken()) ? <Container /> : <h2 className="no-show">Please login...</h2>}
           </div>
        </div>
        {/* {(Utils.hasToken() ? 
          <div className="create-playlist">
            <div className="playlistContainer">
              <div className="cta-child cta-title">Create Your Top Tracks Playlist</div>
              <a onClick={()=> Utils.createPlaylist()}  className="cta-child btn">Create</a>
            </div>
          </div> : '')} */}
      </div>
    );
  }
}

export default App;
