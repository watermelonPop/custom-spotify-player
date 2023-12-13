import React, { useState, useEffect } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import defaultTheme from "./defaultTheme";
import pinkTheme from "./pinkTheme";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

const track = {
  name: "",
  album: {
    images: [
      { url: "" }
    ]
  },
  artists: [
    { name: "" }
  ]
}

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [current_theme, setTheme] = useState(defaultTheme);
  const [volume, setVolume] = useState(0); // State to store the volume
  const [currentPosition, setCurrentPosition] = useState(0); // State to store the current position
  const [isQueueModalOpen, setQueueModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [nextTracks, setNextTracks] = useState([]);
  const [prevTracks, setPrevTracks] = useState([]);
  const themes = [defaultTheme, pinkTheme];



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(props.token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state => {
        if (!state) {
          return;
        }
      
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
      
        player.getCurrentState().then(state => {
          if (!state) {
            setActive(false);
          } else {
            setActive(true);
            setNextTracks(state.track_window.next_tracks);
            setPrevTracks(state.track_window.previous_tracks);
          }
        });
      
        player.getVolume().then(volume => {
          setVolume(volume);
        });
      
        setCurrentPosition(state.position);
      }));

      player.connect();
    };
  }, []);

  useEffect(() => {
    let interval;

    if (!is_paused && is_active) {
      interval = setInterval(() => {
        player.getCurrentState().then(state => {
          if (state) {
            setCurrentPosition(state.position);
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [is_paused, is_active]);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    player.setVolume(newVolume).then(() => {
      setVolume(newVolume);
    });
  };

  const handleSeek = (position) => {
    player.seek(position).then(() => {
      setCurrentPosition(position);
    });
  };

  const handleQueueModalOpen = () => {
    setQueueModalOpen(true);
  };
  
  const handleQueueModalClose = () => {
    setQueueModalOpen(false);
  };

  const handleHistoryModalOpen = () => {
    setHistoryModalOpen(true);
  };
  
  const handleHistoryModalClose = () => {
    setHistoryModalOpen(false);
  };

  const handleSettingsModalOpen = () => {
    setSettingsModalOpen(true);
  };
  
  const handleSettingsModalClose = () => {
    setSettingsModalOpen(false);
  };

  if (!is_active) {
    return (
      <>
        <ThemeProvider theme={current_theme}>
          <CssBaseline />
          <div className="container">
            <div className="main-wrapper">
              <Typography
                component="h2"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              > Instance not active. Transfer your playback using your Spotify app </Typography>
            </div>
            <button onClick={() => setTheme(pinkTheme)}>change theme</button>
          </div>
        </ThemeProvider>
      </>
    )
  } else {
    return (
      <>
      <ThemeProvider theme={current_theme}>
        <div className="outerOuter" style={{ backgroundColor: current_theme.palette.background.dark }}>
          <div className='settingsDiv'>
          <Button
                      className="ctrlBtn"
                      onClick={handleSettingsModalOpen}
                      style={{
                        WebkitAppearance: "none",
                        height: "0.5rem",
                        borderRadius: "0.25rem",
                        background: "transparent",
                        position: "absolute",
                        top: "2rem",
                        right: "0.5rem",
                      }}
                    >
                      <SettingsIcon
                        style={{
                          backgroundColor: "transparent",
                          outline: "none",
                          borderStyle: "none",
                          color: current_theme.palette.secondary.main,
                          fontSize: "1.7rem",
                          marginRight: "1vw",
                        }}
                      />
                    </Button>
          </div>
          <div className='outerBorder' style={{ backgroundColor: current_theme.palette.background.dark }}>
            <div className="pageDisplay" style={{ backgroundColor: current_theme.palette.background.default }}>
              <div className="songDisplay">
                <div className="imgSquare">
                  <img src={current_track.album.images[0].url} className="playingCover" alt="" />
                </div>

                <div className="now-playing__side">
                  <div className="now-playing__name">
                    <Typography
                        component="h1"
                        variant="h1"
                        color="textPrimary"
                        gutterBottom
                      >{current_track.name}</Typography>
                  </div>
                  <div className="now-playing__album">
                    <Typography
                      component="h3"
                      variant="h3"
                      color="textSecondary"
                      gutterBottom
                    >{current_track.album.name}</Typography>
                  </div>
                  <div className='now-playing__artist'>
                    <Typography
                      component="h3"
                      variant="h3"
                      color="textSecondary"
                      gutterBottom
                    >{current_track.artists[0].name}</Typography>
                  </div>
                </div>
              </div>
              <div className='seekBarDiv'>
                <Typography component="subtitle1"
                      variant="subtitle1"
                      color="textSecondary"
                      gutterBottom
                    >
                  <label className="smLabel" htmlFor="seekInput">{formatTime(currentPosition)}</label>
                </Typography>
                <input
                    type="range"
                    min={0}
                    max={current_track.duration_ms}
                    step={1000}
                    value={currentPosition}
                    onChange={(e) => handleSeek(parseInt(e.target.value))}
                    style={{
                      WebkitAppearance: "none",
                      height: "0.5rem",
                      borderRadius: "0.25rem",
                      background: "transparent",
                    }}
                  />
                  <style>
                    {`
                    input[type="range"]::-webkit-slider-runnable-track {
                      height: 0.5rem;
                      background: ${current_theme.palette.secondary.main};
                      border-radius: 0.25rem;
                    }

                    input[type="range"]::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 1rem;
                      height: 1rem;
                      background: ${current_theme.palette.secondary.dark};
                      border-radius: 50%;
                      cursor: pointer;
                      transform: translateY(-25%);
                    }
                    `}
                  </style>
              </div>
              <div className="bottomContols">
              <div className='volumeBtns'>
                <Button className='ctrlBtn' onClick={handleHistoryModalOpen} style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.main,
                        fontSize: "2.5rem",
                      }}><HistoryIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.main,
                        fontSize: "1.8rem",
                        marginRight: "7vw",
                      }}/></Button>
              </div>
                <div className='ctrlBtns'>
                <button
                    onClick={() => { player.previousTrack() }}
                    style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      borderStyle: "none",
                      cursor: "pointer",
                    }}
                  >
                    <SkipPreviousIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.primary.main,
                        fontSize: "2.5rem",
                        marginRight: "7vw",
                      }}/>
                  </button>

                <button onClick={() => { player.togglePlay() }} style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      borderStyle: "none",
                      cursor: "pointer",
                    }} >
                  {is_paused ? <PlayArrowIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.primary.main,
                        fontSize: "2.5rem",
                        marginRight: "7vw",
                      }}/> : <PauseIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.primary.main,
                        fontSize: "2.5rem",
                        marginRight: "7vw",
                      }}/>}
                </button>

                <button onClick={() => { player.nextTrack() }} style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      borderStyle: "none",
                      cursor: "pointer",
                    }} >
                  <SkipNextIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.primary.main,
                        fontSize: "2.5rem",
                      }}/>
                </button>
              </div>
              <div className='volumeBtns'>
                <Button className='ctrlBtn' onClick={handleQueueModalOpen} style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.main,
                        fontSize: "2.5rem",
                      }}><QueueMusicIcon/></Button>
                <VolumeUpIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.main,
                        fontSize: "1.7rem",
                        marginRight: "1vw",
                      }}/>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    WebkitAppearance: "none",
                    height: "0.5rem",
                    borderRadius: "0.25rem",
                    background: "transparent",
                  }}
                />
              </div>

              <Modal open={isQueueModalOpen} onClose={handleQueueModalClose}>
                <div>
                  <div className="queueDiv" style={{
                    background: current_theme.palette.background.default,
                    fontSize: "1.7rem",
                    opacity: "100%",
                    position: "relative",
                     // Add margin to create space between the title and tracks
                  }}>
                    <Typography
                      component="h1"
                      variant="h1"
                      color="textPrimary"
                      gutterBottom
                    >
                      Queued Tracks
                    </Typography>
                    <Button
                      className="ctrlBtn"
                      onClick={handleQueueModalClose}
                      style={{
                        WebkitAppearance: "none",
                        height: "0.5rem",
                        borderRadius: "0.25rem",
                        background: "transparent",
                        position: "absolute",
                        top: "2rem",
                        right: "0.5rem",
                      }}
                    >
                      <CloseIcon
                        style={{
                          backgroundColor: "transparent",
                          outline: "none",
                          borderStyle: "none",
                          color: current_theme.palette.secondary.main,
                          fontSize: "1.7rem",
                          marginRight: "1vw",
                        }}
                      />
                    </Button>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "3rem", }}>
                      {nextTracks.map((track, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                          <div className="imgSquare" style={{ width: "7rem", height: "7rem", marginRight: "2rem" }}>
                            <img src={track.album.images[0].url} className="queuedCover" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div className="queuedTrackInfo">
                            <div>{track.name}</div>
                            <div>{track.artists[0].name}</div>
                            <div>{track.album.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal open={isHistoryModalOpen} onClose={handleHistoryModalClose}>
                <div>
                  <div className="queueDiv" style={{
                    background: current_theme.palette.background.default,
                    fontSize: "1.7rem",
                    opacity: "100%",
                    position: "relative",
                     // Add margin to create space between the title and tracks
                  }}>
                    <Typography
                      component="h1"
                      variant="h1"
                      color="textPrimary"
                      gutterBottom
                    >
                      History
                    </Typography>
                    <Button
                      className="ctrlBtn"
                      onClick={handleHistoryModalClose}
                      style={{
                        WebkitAppearance: "none",
                        height: "0.5rem",
                        borderRadius: "0.25rem",
                        background: "transparent",
                        position: "absolute",
                        top: "2rem",
                        right: "0.5rem",
                      }}
                    >
                      <CloseIcon
                        style={{
                          backgroundColor: "transparent",
                          outline: "none",
                          borderStyle: "none",
                          color: current_theme.palette.secondary.main,
                          fontSize: "1.7rem",
                          marginRight: "1vw",
                        }}
                      />
                    </Button>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "3rem", }}>
                      {prevTracks.map((track, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                          <div className="imgSquare" style={{ width: "7rem", height: "7rem", marginRight: "2rem" }}>
                            <img src={track.album.images[0].url} className="queuedCover" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div className="queuedTrackInfo">
                            <div>{track.name}</div>
                            <div>{track.artists[0].name}</div>
                            <div>{track.album.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal open={isSettingsModalOpen} onClose={handleSettingsModalClose}>
                <div>
                  <div className="queueDiv" style={{
                    background: current_theme.palette.background.default,
                    fontSize: "1.7rem",
                    opacity: "100%",
                    position: "relative",
                     // Add margin to create space between the title and tracks
                  }}>
                    <Typography component="h1" variant="h1" color="textPrimary" gutterBottom>
                      Settings
                    </Typography>
                    <Button
                      className="ctrlBtn"
                      onClick={handleSettingsModalClose}
                      style={{
                        WebkitAppearance: "none",
                        height: "0.5rem",
                        borderRadius: "0.25rem",
                        background: "transparent",
                        position: "absolute",
                        top: "2rem",
                        right: "0.5rem",
                      }}
                    >
                      <CloseIcon
                        style={{
                          backgroundColor: "transparent",
                          outline: "none",
                          borderStyle: "none",
                          color: current_theme.palette.secondary.main,
                          fontSize: "1.7rem",
                          marginRight: "1vw",
                        }}
                      />
                    </Button>
                    <div style={{marginTop: "3rem"}}>
                    <Typography
                      component="h3"
                      variant="h3"
                      color="textSecondary"
                      className="centerAligned"
                      gutterBottom
                    >Themes</Typography>
                      <div className="outerThemeDiv" style={{marginTop: "1.5rem"}}>
                        {themes.map((theme) => (
                          <div className="themeDiv" key={theme.name} >
                            <span className="themeName">{theme.name}: </span>
                            <div className="colorBlocks">
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.primary.main,
                                }}
                              />
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.background.default,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          </div>
          </div>
        </ThemeProvider>
      </>
    );
  }
}

export default WebPlayback;