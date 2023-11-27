import React, { useState, useEffect } from 'react';
import Settings from './Settings';

const track = {
  name: '',
  album: {
    images: [{ url: '' }]
  },
  artists: [{ name: '' }]
};

const WebPlayback = (props) => {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [colorPreferences, setColorPreferences] = useState({
    primaryBackground: '',
    primaryTextColor: ''
  });
  const [showSettings, setShowSettings] = useState(false);
  //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    // Load color preferences from local storage when the component mounts
    const storedPreferences = localStorage.getItem('colorPreferences');
    if (storedPreferences) {
      setColorPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    // Apply color changes when colorPreferences or cssVersion change
    applyColorPreferences();
  }, [colorPreferences]);
  
  const applyColorPreferences = () => {
    const root = document.documentElement;
  
    // Update primaryBackground CSS variable
    if (colorPreferences.primaryBackground?.match(/^#[0-9A-Fa-f]{6}$/)) {
      root.style.setProperty('--primaryBackground', colorPreferences.primaryBackground);
    } else {
      console.error('Invalid primaryBackground:', colorPreferences.primaryBackground);
    }
  
    // Update primaryTextColor CSS variable
    if (colorPreferences.primaryTextColor?.match(/^#[0-9A-Fa-f]{6}$/)) {
      root.style.setProperty('--primaryTextColor', colorPreferences.primaryTextColor);
    } else {
      console.error('Invalid primaryTextColor:', colorPreferences.primaryTextColor);
    }
  
    // Additional CSS variables and styles can be updated as needed
    setShowSettings(false);
    //forceUpdate();
    //forceRender((prev) => !prev);
    //this.setState();
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColorPreferences((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSettingsClick = () => {
    setShowSettings(true); // Show the settings modal
  };

  const handleCloseSettings = () => {
    setShowSettings(false); // Close the settings modal
  };

  const handleSavePreferences = (preferences) => {
    // Save the preferences to local storage
    localStorage.setItem('colorPreferences', JSON.stringify(preferences));

    // Apply the color preferences immediately
    applyColorPreferences(preferences);
    // Display a success message or perform any other actions upon saving the preferences
  };

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Instance not active. Transfer your playback using your Spotify app </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">{current_track.artists[0].name}</div>
              <button className="btn-spotify" onClick={() => player.previousTrack()}>
                ⏮
              </button>
              <button className="btn-spotify" onClick={() => player.togglePlay()}>
                {is_paused ? ' ▶ ' : ' ⏸ '}
              </button>
              <button className="btn-spotify" onClick={() => player.nextTrack()}>
⏭
              </button>
              <button className="btn-spotify" onClick={handleSettingsClick}>
                Settings
              </button>
            </div>
          </div>
        </div>
        {showSettings && (
          <div className="settingsPanel">
            <div className="settingsPanelContent">
              <span className="close" onClick={handleCloseSettings}>
                &times;
              </span>
              <Settings
                colorPreferences={colorPreferences}
                onColorChange={handleColorChange}
                onSavePreferences={handleSavePreferences} // Add this prop
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default WebPlayback;