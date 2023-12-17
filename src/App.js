import React, { useState, useEffect } from 'react';
import WebPlayback from './WebPlayback'
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('https://spotify-web-player-server-5f57396ce647.herokuapp.com/auth/token');
      const json = await response.json();
      setToken(json.access_token);
      console.log("token grabbed!");
    }

    getToken();

  }, []);

  return (
    <>
        { !token ? <Login/> : <WebPlayback token={token} /> }
    </>
  );
}


export default App;
