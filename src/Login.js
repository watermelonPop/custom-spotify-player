import React from 'react';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <b className='headerTitle'>Custom Spotify Web Player</b>
                <a className="btn-spotify" href="https://spotify-web-player-server-5f57396ce647.herokuapp.com/auth/login" >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;

