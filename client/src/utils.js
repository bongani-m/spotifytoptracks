class Utils {
    static getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

    static saveAccessToken() {
        var params = this.getHashParams();
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;
        if(error) {
            return;
        }
        sessionStorage.setItem('refreshToken', refresh_token);
        sessionStorage.setItem('accessToken', access_token);
        window.location.hash = '';
    }

    static hasToken() {
        return sessionStorage.getItem('accessToken') != 'undefined';
    }

    static async getNewAccessToken() {

        var options = { method: 'GET',  mode: 'cors' };

        var uri = 'https://spotifytoptracks.herokuapp.com/refresh_token?refresh_token=' + sessionStorage.getItem('refreshToken');
        try { 
        var response = await fetch(uri, options);
        var data = await response.json();
        sessionStorage.setItem('accessToken', data.access_token);
        } catch(e) {
            console.log(e);
        }
    }

    static async getUserInfo() {var options = { method: 'GET',  mode: 'cors' };
        var options = { method: 'GET',  mode: 'cors', headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
        }, };     

        var uri = 'https://api.spotify.com/v1/me';
        try { 
        var response = await fetch(uri, options);
        return await response.json();
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }

    static async getTopTracks() {
        var options = { method: 'GET',  mode: 'cors', headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
        }, };     

        var uri = 'https://api.spotify.com/v1/me/top/tracks';
        try { 
        var response = await fetch(uri, options);
        return await response.json();
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }

    static async getTopArtists() {
        var options = { method: 'GET',  mode: 'cors', headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
        }, };     

        var uri = 'https://api.spotify.com/v1/me/top/artists';
        try { 
        var response = await fetch(uri, options);
        return await response.json();
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }

    static async createPlaylist() {
        var user = JSON.parse(sessionStorage.getItem('user'));
        var options = { 
            method: 'POST',  
            mode: 'cors', 
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
             body: JSON.stringify({
                "name": `Top Songs ${(new Date()).toLocaleDateString()} `,
                "description": "Current Top 100 Songs " + (new Date()).toLocaleDateString(),
                "public": false
            }) };     

        var uri = `https://api.spotify.com/v1/users/${user.id}/playlists`;
        
        try { 
            var response = await fetch(uri, options);
            var playlist =  await response.json();
            var user = await this.getUserInfo();
            var tracks = await this.getTopTracks();
            var uris = tracks.items.map(track => track.uri);
            var uri2 = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
            var options2 = { method: 'POST',  mode: 'cors', headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
            }, body: JSON.stringify({uris}) };     

            var response2 = await fetch(uri2, options2);
            var playlist2 =  await response2.json();
            window.open(playlist.external_urls.spotify);
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }
}

export default Utils;