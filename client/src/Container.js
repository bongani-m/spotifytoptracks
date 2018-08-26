import React, { Component } from 'react';
import Utils from './utils';

class Container extends Component {

  constructor(props) {
    super(props);
    Utils.getUserInfo().then(user => {
      sessionStorage.setItem('user', JSON.stringify(user))
    });   
  }

  componentDidMount() {
    Utils.getTopTracks().then(tracks => {
      Utils.getTopArtists().then(artists => {
        this.setState({tracks, artists});
        
      }); 
    });
  }

  render() {
    return (
        <div>
        <div className='data'>
          <h2 className="title type">Top Tracks</h2>
          <div className="tracks">
          {
            (this.state && this.state.tracks) ? this.state.tracks.items.map((track, index) => {
              
            return <div key={index} className="track">
              <div className="trackImage" style={{ backgroundSize: 'cover', backgroundImage: "url('" + track.album.images[1].url + "')"}} ></div> 
              <h4 className="artist-info"><span><a target="_blank" href={track.external_urls.spotify}>{track.name}</a></span> by <a target="_blank" href={track.artists[0]. external_urls.spotify}>{track.artists[0].name }</a></h4>
            </div> 

            }) : ''
          }
          </div>
          <h2 className="title type">Top Artists</h2>
          <div className="tracks last">
          {
            (this.state && this.state.artists) ? this.state.artists.items.map((track, index) => {
              
            return <div key={index} className="track">
              <div className="trackImage"  style={{backgroundSize: 'cover', backgroundImage: "url('" + track.images[1].url + "')"}} ></div> 
              <h4 className="artist-info"><span><a target="_blank" href={track.external_urls.spotify}>{track.name}</a></span> </h4>
            </div> 

            }) : ''
          }
            <div className="track">
            </div>
          </div>
        </div>
        <div>
        </div>
        </div>
    );
  }
}

export default Container;
