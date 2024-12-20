import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4eb7fa6a3b80412595f5ef4932d67cfd&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-follow-read";

    return (
        <div className="App">
            <header className="App-header">
                <b className='headerTitle'>Custom Spotify Web Player</b>
                <a className="btn-spotify" href={AUTH_URL}>
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;