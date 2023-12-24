import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource/montserrat';
import "@fontsource/gamja-flower";
import '@fontsource/courier-prime';
import '@fontsource/vidaloka';
import '@fontsource-variable/nunito';
import '@fontsource-variable/oswald';
import defaultTheme from "./defaultTheme";
import strawberryTheme from "./strawberryTheme";
import pjTheme from "./pjTheme";
import tteokTheme from "./tteokTheme";
import ambTheme from "./ambTheme";
import earthTheme from "./earthTheme";
import customTheme from "./customTheme";
import sunsetTheme from "./sunsetTheme";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { ColorPicker } from "react-mui-color";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';

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
  const [isRefreshModalOpen, setRefreshModalOpen] = useState(false);
  const [isCustomModalOpen, setCustomModalOpen] = useState(false);
  const [nextTracks, setNextTracks] = useState([]);
  const [prevTracks, setPrevTracks] = useState([]);
  const [themes, setThemes] = useState([defaultTheme, strawberryTheme, pjTheme, tteokTheme, ambTheme, earthTheme, sunsetTheme, customTheme]);
  const [playerName, setPlayerName] = useState("Custom Spotify Player");
  const fonts = ["Montserrat", "Courier Prime", "Vidaloka", "Gamja Flower", "Oswald Variable", "Nunito Variable"];
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedColors, setSelectedColors] = useState({
    primaryBg: defaultTheme.palette.background.default,
    secondaryBg: defaultTheme.palette.background.dark,
    playBtns: defaultTheme.palette.primary.main,
    primaryBtns: defaultTheme.palette.secondary.main,
    touchBar: defaultTheme.palette.secondary.dark,
    primaryTxt: defaultTheme.palette.text.primary,
    secondaryTxt: defaultTheme.palette.text.secondary
  });
  const [hasRoundedCorners, setHasRoundedCorners] = useState(false);



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

      const storedPlayerName = getPlayerNameFromLocalStorage();
      player.setName(storedPlayerName).then(() => {
        setPlayerName(storedPlayerName);
      });

      const storedThemeIndex = getThemeFromLocalStorage().toString();
      let chosenTheme = themes[storedThemeIndex];
      setTheme(chosenTheme);

      const storedCustomTheme = JSON.parse(getCustomFromLocalStorage());
      const updatedThemes = [...themes];
      updatedThemes[updatedThemes.length - 1] = storedCustomTheme;
      setThemes(updatedThemes);

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

  const handleCustomModalOpen = () => {
    setCustomModalOpen(true);
    handleSettingsModalClose();
  };
  
  const handleCustomModalClose = () => {
    setCustomModalOpen(false);
    handleSettingsModalOpen();
  };

  const handleSettingsModalOpen = () => {
    setSettingsModalOpen(true);
  };
  
  const handleSettingsModalClose = () => {
    setSettingsModalOpen(false);
  };

  const handleRefreshModalOpen = () => {
    setRefreshModalOpen(true);
  };
  
  const handleRefreshModalClose = () => {
    setRefreshModalOpen(false);
  };

  const setCustomInLocalStorage = (newCustomTheme) => {
    localStorage.setItem('customTheme', JSON.stringify(newCustomTheme));
  };

  const getCustomFromLocalStorage = () => {
    return localStorage.getItem('customTheme') || JSON.stringify(customTheme);
  };

  const handleThemeChange = (newTheme) => {
    let ind = themes.indexOf(newTheme);
    setThemeInLocalStorage(ind.toString());
    console.log('Changing theme to:', newTheme);
    setTheme(newTheme);
    console.log('Current theme state:', current_theme);
  };

  const setThemeInLocalStorage = (newInd) => {
    localStorage.setItem('currentTheme', newInd.toString());
  };

  const getThemeFromLocalStorage = () => {
    return localStorage.getItem('currentTheme') || "0";
  };

  // Function to set player name in local storage
  const setPlayerNameInLocalStorage = (newName) => {
    localStorage.setItem('playerName', newName);
  };

  // Function to get player name from local storage
  const getPlayerNameFromLocalStorage = () => {
    return localStorage.getItem('playerName') || "Custom Spotify Player";
  };

  const handlePlayerNameChange = (newName) => {
    console.log("Player Name:", playerName);
  
    // Set player name in local storage
    setPlayerNameInLocalStorage(newName);
  
    player.setName(newName).then(() => {
      setPlayerName(newName);
      console.log("Player Name: ", newName);
    });

    handleRefreshModalOpen();
  };

  const handleColorChange = (key, color, keepOpen = false) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [key]: color,
    }));

    if (!keepOpen) {
      // Handle closing the color picker if needed
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRoundedCornersChange = (event) => {
    setHasRoundedCorners(event.target.checked);
  };

  const handleApplySettings = () => {
    // Create a new custom theme based on the default theme
    console.log("applying custom settings");
    let fontW = "normal";
    if (selectedFont === 'Montserrat') {
      fontW = "bold";
    }

    let borderR = "0rem";
    if (hasRoundedCorners) {
      borderR = "1rem";
    }

    // Function to check if a color value is valid
    const isValidColor = (color) => {
      return /^#([A-Fa-f0-9]{3}){1,2}$|^rgb\((\d{1,3},\s*){2}\d{1,3}\)$|^rgba\((\d{1,3},\s*){3}(1|0?\.\d+)\)$|^hsl\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%\)$|^hsla\(\d{1,3},\s*\d{1,3}%,\s*\d{1,3}%,\s*(1|0?\.\d+)\)$|^color\(\w+\)$/i.test(color);
    };

    // Validate the selected colors
    const selectedColorsValidated = {
      primaryBg: isValidColor(selectedColors.primaryBg) ? selectedColors.primaryBg : '#2196f3',
      secondaryBg: isValidColor(selectedColors.secondaryBg) ? selectedColors.secondaryBg : '#2196f3',
      playBtns: isValidColor(selectedColors.playBtns) ? selectedColors.playBtns : '#2196f3',
      primaryBtns: isValidColor(selectedColors.primaryBtns) ? selectedColors.primaryBtns : '#2196f3',
      touchBar: isValidColor(selectedColors.touchBar) ? selectedColors.touchBar : '#2196f3',
      primaryTxt: isValidColor(selectedColors.primaryTxt) ? selectedColors.primaryTxt : '#2196f3',
      secondaryTxt: isValidColor(selectedColors.secondaryTxt) ? selectedColors.secondaryTxt : '#2196f3',
    };

    console.log("type: " + typeof(selectedColors.touchBar));
    console.log("value: " + selectedColors.touchBar);

    let updatedTheme = responsiveFontSizes(
      createTheme({
        name: "custom-theme",
        spacing: 4,
        typography: {
            fontFamily: selectedFont,
            borderRadius: borderR,
          h1: {
            fontSize: '3.0rem',
            fontFamily: selectedFont,
            textAlign: 'left',
            fontWeight: fontW,
          },
          h2: {
            fontSize: '2.5rem',
            fontFamily: selectedFont,
            fontStyle: 'bold',
            textAlign: 'left',
            fontWeight: fontW,
          },
          h3: {
            fontSize: '2.0rem',
            fontFamily: selectedFont,
            textAlign: 'left',
            fontWeight: fontW,
          },
          h4: {
            fontSize: '1.5rem',
            fontFamily: selectedFont,
            textAlign: 'left',
            fontWeight: fontW,
          },
          body1: {
            fontSize: '1.3rem',
            fontFamily: selectedFont,
            textAlign: 'justify',
            fontWeight: fontW,
          },
          subtitle1:{
            fontSize: '1.0rem',
            fontFamily: selectedFont,
            textAlign: 'justify',
            fontWeight: fontW,
          }
        },
        palette: {
          background: {
            main: selectedColorsValidated.primaryBg,
            default: selectedColorsValidated.primaryBg,
            dark: selectedColorsValidated.secondaryBg,
            light: '#FFFFFF',
          },
          primary: {
            main: selectedColorsValidated.playBtns,
          },
          secondary: {
            main: selectedColorsValidated.primaryBtns,
            dark: selectedColorsValidated.touchBar,
          },
          error: {
            main: '#F52735', // red
          },
          warning: {
            main: '#F52735', // orange
          },
          info: {
            main: '#2C3A6C', // gray
          },
          success: {
            main: '#09FE00', // green
          },
          text: {
            main: selectedColorsValidated.primaryTxt,
            primary: selectedColorsValidated.primaryTxt, 
            secondary: selectedColorsValidated.secondaryTxt, 
          },
        },
      })
    );

    setSelectedColors({
      primaryBg: selectedColorsValidated.primaryBg,
      secondaryBg: selectedColorsValidated.secondaryBg,
      playBtns: selectedColorsValidated.playBtns,
      primaryBtns: selectedColorsValidated.primaryBtns,
      touchBar: selectedColorsValidated.touchBar,
      primaryTxt: selectedColorsValidated.primaryTxt,
      secondaryTxt: selectedColorsValidated.secondaryTxt
    });

    console.log("custom theme created");

    const updatedThemes = [...themes];
    updatedThemes[updatedThemes.length - 1] = updatedTheme;

    setThemes(updatedThemes);

    console.log("custom theme updated");

    setCustomInLocalStorage(updatedTheme);

    handleCustomModalClose();
  }
    

  

  if (!is_active) {
    return (
      <>
        <ThemeProvider theme={current_theme || defaultTheme}>
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
          </div>
        </ThemeProvider>
      </>
    )
  } else {
    return (
      <>
      <ThemeProvider theme={current_theme || defaultTheme}>
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
                          filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                        }}
                      />
                    </Button>
          </div>
          <div className='outerBorder' style={{ backgroundColor: current_theme.palette.background.dark }}>
            <div className="pageDisplay" style={{ backgroundColor: current_theme.palette.background.default,
             borderRadius: current_theme.typography.borderRadius }}>
              <div className="songDisplay">
                <div className="imgSquare">
                  <img src={current_track.album.images[0].url} className="playingCover" alt="" style={{ borderRadius: current_theme.typography.borderRadius }}/>
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
                    id="trackTime"
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
                      #trackTime::-webkit-slider-runnable-track {
                        height: 0.5rem;
                        background: ${current_theme.palette.primary.main};
                        border-radius: 0.25rem;
                        background-image: linear-gradient(
                          to right,
                          ${current_theme.palette.secondary.dark} 0%,
                          ${current_theme.palette.secondary.dark} ${(currentPosition / current_track.duration_ms) * 100}%,
                          ${current_theme.palette.secondary.main} ${(currentPosition / current_track.duration_ms) * 100}%,
                          ${current_theme.palette.secondary.main} 100%
                        );
                      }

                      #trackTime::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 1rem;
                        height: 1rem;
                        background: ${current_theme.palette.secondary.dark};
                        border-radius: 50%;
                        cursor: pointer;
                        transform: translateY(-25%);
                      }

                      input#volumeInput::-webkit-slider-runnable-track {
                        height: 0.5rem;
                        background: ${current_theme.palette.primary.main};
                        border-radius: 0.25rem;
                        background-image: linear-gradient(
                          to right,
                          ${current_theme.palette.secondary.dark} 0%,
                          ${current_theme.palette.secondary.dark} ${(volume / 1) * 100}%,
                          ${current_theme.palette.secondary.main} ${(volume / 1) * 100}%,
                          ${current_theme.palette.secondary.main} 100%
                        );
                      }
                    
                      input#volumeInput::-webkit-slider-thumb {
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
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
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
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
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
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                      }}/> : <PauseIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.primary.main,
                        fontSize: "2.5rem",
                        marginRight: "7vw",
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
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
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
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
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                      }}><QueueMusicIcon/></Button>
                <VolumeUpIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.main,
                        fontSize: "1.7rem",
                        marginRight: "1vw",
                        filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                      }}/>
                <input
                  id="volumeInput"
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

              <style>
                {`
                  .queueDiv{
                    border-radius: ${current_theme.typography.borderRadius};
                  }
                `}
              </style>

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
                      textAlign="center"
                      marginBottom="6rem"
                      marginTop="6rem"
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
                          filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                        }}
                      />
                    </Button>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "3rem", marginLeft: "4rem", marginRight: "4rem"}}>
                      {nextTracks.map((track, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "left", marginBottom: "3rem" }}>
                          <div className="imgSquare" style={{ width: "7rem", height: "7rem", marginRight: "2rem" }}>
                            <img src={track.album.images[0].url} className="queuedCover" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <style>
                            {`
                              .queuedCover{
                                border-radius: ${current_theme.typography.borderRadius === "1rem" ? "0.5rem" : "0rem"}
                              }
                            `}
                          </style>
                          <div className="queuedTrackInfo">
                          <Typography
                              component="h3"
                              variant="h3"
                              color="textPrimary"
                              gutterBottom
                            >{track.name}</Typography>
                            <Typography
                              component="h4"
                              variant="h4"
                              color="textSecondary"
                              gutterBottom
                            >{track.artists[0].name}</Typography>
                            <Typography
                              component="h4"
                              variant="h4"
                              color="textSecondary"
                              gutterBottom
                            >{track.album.name}</Typography>
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
                        textAlign="center"
                        marginBottom="6rem"
                        marginTop="6rem"
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
                            filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                          }}
                        />
                      </Button>
                      <div style={{ display: "flex", flexDirection: "column", marginTop: "3rem", marginLeft: "6rem", marginRight: "6rem"}}>
                        {prevTracks.map((track, index) => (
                          <div key={index} style={{ display: "flex", alignItems: "left", marginBottom: "3rem", }}>
                            <div className="imgSquare" style={{ width: "7rem", height: "7rem", marginRight: "2rem" }}>
                              <img src={track.album.images[0].url} className="queuedCover" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div className="queuedTrackInfo">
                              <Typography
                                  component="h3"
                                  variant="h3"
                                  color="textPrimary"
                                  gutterBottom
                                >{track.name}</Typography>
                              <Typography
                                component="h4"
                                variant="h4"
                                color="textSecondary"
                                gutterBottom
                              >{track.artists[0].name}</Typography>
                              <Typography
                                component="h4"
                                variant="h4"
                                color="textSecondary"
                                gutterBottom
                              >{track.album.name}</Typography>
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
                          filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                        }}
                      />
                    </Button>
                    <div marginBottom="6rem" >
                      <Typography component="h1" variant="h1" color="textPrimary" textAlign="center" marginTop="6rem" marginBottom="2rem" gutterBottom>
                        Settings
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h3"
                        color="textSecondary"
                        className="centerAligned"
                        style={{marginTop: "2rem"}}
                        gutterBottom
                      >General</Typography>
                      <div className='labelInputDiv'>
                        <Typography className="labelComp" component="h4" variant="h4" color="textPrimary" gutterBottom>Player Name: </Typography>
                        <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} style={{
                          backgroundColor: "transparent",
                          background: "transparent",
                          color: current_theme.palette.text.primary,
                          borderStyle: "solid",
                          borderColor: current_theme.palette.background.light,
                          borderRadius: "0.5rem",
                          borderWidth: "0.25rem",
                          fontFamily: current_theme.typography.fontFamily,
                          fontSize: current_theme.typography.subtitle1.fontSize,
                          fontWeight: "bold",
                          padding: "0.5rem",
                          margin: "0.5rem",
                          outline: "none",
                        }}/>
                        <button onClick={() => handlePlayerNameChange(playerName)} style={{
                          backgroundColor: current_theme.palette.background.light,
                          color: current_theme.palette.primary.main,
                          borderStyle: "solid",
                          borderColor: current_theme.palette.background.light,
                          borderRadius: "0.5rem",
                          borderWidth: "0.25rem",
                          fontFamily: current_theme.typography.fontFamily,
                          fontSize: current_theme.typography.subtitle1.fontSize,
                          fontWeight: "bold",
                          padding: "0.5rem",
                          cursor: "pointer",
                        }}>Apply</button>
                      </div>
                    </div>
                    <div style={{marginTop: "3rem"}}>
                    <Typography
                      component="h3"
                      variant="h3"
                      color="textSecondary"
                      className="centerAligned"
                      gutterBottom
                    >Themes</Typography>
                    <style>
                    {`
                      .current_theme {
                        border-style: solid;
                        border-radius: ${current_theme.typography.borderRadius === "1rem" ? "0.5rem" : "0rem"};
                        border-color: ${current_theme.palette.primary.main} ;
                        background-color: ${current_theme.palette.secondary.main} ;
                        color: ${current_theme.palette.text.primary};
                      }
                    `}
                    </style>
                      <div className="outerThemeDiv" style={{ marginTop: "1.5rem" }}>
                        {themes.map((theme) => (
                          <div
                            className={`themeDiv ${theme === current_theme ? "current_theme" : ""}`}
                            key={theme.name}
                            onClick={() => handleThemeChange(theme)}
                          >
                            <Typography className="labelComp" component="h4" variant="h4" color="textPrimary" gutterBottom><span className="themeName">{theme.name}: </span></Typography>
                            <div className="colorBlocks">
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.background.default,
                                }}
                              />
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.background.dark,
                                }}
                              />
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.primary.main,
                                }}
                              />
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.secondary.main,
                                }}
                              />
                              <div
                                className="colorBlock"
                                style={{
                                  backgroundColor: theme.palette.secondary.dark,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{textAlign: "center", alignItems: "center", marginBottom: "6rem"}}>
                        <button onClick={handleCustomModalOpen} style={{
                            backgroundColor: current_theme.palette.background.light,
                            color: current_theme.palette.primary.main,
                            borderStyle: "solid",
                            borderColor: current_theme.palette.background.light,
                            borderRadius: "0.5rem",
                            borderWidth: "0.25rem",
                            fontFamily: current_theme.typography.fontFamily,
                            fontSize: current_theme.typography.subtitle1.fontSize,
                            fontWeight: "bold",
                            padding: "0.5rem",
                            cursor: "pointer",
                            textAlign: "center",
                          }}>+ create theme</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal open={isCustomModalOpen} onClose={handleCustomModalClose} style={{maxHeight: "100%"}}>
                <div>
                  <div className="queueDiv" style={{ background: current_theme.palette.background.default,
                    fontSize: "1.7rem",
                    opacity: "100%",
                    position: "relative", }}>
                      <Button
                      className="ctrlBtn"
                      onClick={handleCustomModalClose}
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
                          filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
                        }}
                      />
                    </Button>
                      <div marginBottom="6rem">
                      <Typography component="h1" variant="h1" color="textPrimary" textAlign="center" marginTop="6rem" marginBottom="2rem" gutterBottom>
                        Customize Theme
                      </Typography>
                      <div style={{marginTop: "2rem", width: "100%", textAlign: "justify", justifyContent: "space-around"}}>
                        <Typography component="h3" variant="h3" color="textSecondary" className="centerAligned" gutterBottom>
                            Colors
                        </Typography>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Primary Background Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.primaryBg} onChange={(color) => handleColorChange('primaryBg', color)} style={{textAlign: "center", alignItems: "center"}} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Secondary Background Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.secondaryBg} onChange={(color) => handleColorChange('secondaryBg', color)} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Play Buttons Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.playBtns} onChange={(color) => handleColorChange('playBtns', color)} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Primary Buttons Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.primaryBtns} onChange={(color) => handleColorChange('primaryBtns', color)} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Touch Bar Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.touchBar} onChange={(color) => handleColorChange('touchBar', color)} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Primary Text Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.primaryTxt} onChange={(color) => handleColorChange('primaryTxt', color)} />
                        </div>
                        <div className='customDiv'>
                          <Typography component="body1" variant="body1" color="textSecondary" className="centerAligned" gutterBottom>
                            Secondary Text Color:
                          </Typography>
                          <ColorPicker variant="free" color={selectedColors.secondaryTxt} onChange={(color) => handleColorChange('secondaryTxt', color)} width="100%"/>
                        </div> 
                      </div>
                      <div style={{marginTop: "2rem", width: "100%", textAlign: "center"}}>
                        <Typography component="h3" variant="h3" color="textSecondary" className="centerAligned" gutterBottom>
                          Font
                        </Typography>
                        <select style={{
                          backgroundColor: "transparent",
                          background: "transparent",
                          color: current_theme.palette.text.primary,
                          borderStyle: "solid",
                          borderColor: current_theme.palette.background.light,
                          borderRadius: "0.5rem",
                          borderWidth: "0.25rem",
                          fontFamily: current_theme.typography.fontFamily,
                          fontSize: current_theme.typography.subtitle1.fontSize,
                          fontWeight: "bold",
                          padding: "0.5rem",
                          margin: "0.5rem",
                        }} value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
                          {fonts.map((font, index) => (
                            <option key={index} value={font}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='checkboxContain' style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
                        <Typography component="h3" variant="h3" color="textSecondary" className="centerAligned" gutterBottom>
                          Corners
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <label htmlFor="roundedCorners" className="customCheckbox">
                            <input
                              type="checkbox"
                              id="roundedCorners"
                              name="roundedCorners"
                              value="roundedCorners"
                              onChange={handleRoundedCornersChange}
                              checked={hasRoundedCorners}
                              style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <Typography
                            component="body1"
                            variant="body1"
                            color="textSecondary"
                            className="centerAligned"
                            gutterBottom
                          >
                            Rounded Corners
                          </Typography>
                        </div>
                      </div>
                      <style>{
                        `.checkboxContain {
                          position: relative;
                          padding-left: 35px;
                          margin-bottom: 12px;
                          cursor: pointer;
                          font-size: 22px;
                          user-select: none;
                        }

                        .customCheckbox {
                          position: relative;
                          cursor: pointer;
                          padding-left: 25px;
                        }

                        .checkmark {
                          position: absolute;
                          top: 50%;
                          transform: translateY(-50%);
                          left: 0;
                          height: 20px;
                          width: 20px;
                          background-color: ${current_theme.palette.background.secondary};
                          border: 2px solid ${current_theme.palette.text.primary};
                        }

                        .customCheckbox input[type="checkbox"]:checked + .checkmark {
                          background-color: ${current_theme.palette.primary.main};
                        }

                        .checkmark:after {
                          content: "";
                          position: absolute;
                          display: none;
                        }

                        .customCheckbox input[type="checkbox"]:checked + .checkmark:after {
                          display: block;
                        }

                        .customCheckbox .checkmark:after {
                          left: 6px;
                          top: 3px;
                          width: 5px;
                          height: 10px;
                          border-style: solid;
                          border-color: ${current_theme.palette.text.primary};
                          border-width: 0 2px 2px 0;
                          transform: rotate(45deg);
                        }`
                      }
                      </style>
                      <div style={{marginTop: "0.5rem", width: "100%", textAlign: "center", marginBottom: "6rem" }}>
                        <button style={{
                                backgroundColor: current_theme.palette.background.light,
                                color: current_theme.palette.primary.main,
                                borderStyle: "solid",
                                borderColor: current_theme.palette.background.light,
                                borderRadius: "0.5rem",
                                borderWidth: "0.25rem",
                                fontFamily: current_theme.typography.fontFamily,
                                fontSize: current_theme.typography.subtitle1.fontSize,
                                fontWeight: "bold",
                                padding: "0.5rem",
                                cursor: "pointer",
                                textAlign: "center",
                              }} onClick={handleApplySettings}>Apply</button>
                      </div>
                  </div>
                  </div>
                </div>
              </Modal>

              <Modal open={isRefreshModalOpen} onClose={handleRefreshModalClose}>
                <div>
                  <div className="queueDiv" style={{
                    background: current_theme.palette.background.default,
                    fontSize: "1.7rem",
                    opacity: "100%",
                    position: "relative",
                    textAlign: "center",
                     // Add margin to create space between the title and tracks
                  }}>
                    <Typography component="h1" variant="h1" color="textPrimary" textAlign="center" marginTop="6rem" gutterBottom>
                      Refresh!
                    </Typography>
                    <Typography component="h3" variant="h3" color="textSecondary" textAlign="center" gutterBottom>
                      Refresh the page to see changes!
                    </Typography>
                    <button onClick={handleRefresh} style={{
                      backgroundColor: "backgroundDark",
                      outline: "none",
                      borderStyle: "solid",
                      borderColor: "backgroundDark",
                      borderRadius: "1rem",
                      padding: "1rem",
                      marginTop: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                    }}><RefreshIcon style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        borderStyle: "none",
                        color: current_theme.palette.secondary.dark,
                        fontSize: "2.5rem",
                      }}/></button>
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