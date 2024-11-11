import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "4eb7fa6a3b80412595f5ef4932d67cfd",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(null);
  const [repeatState, setRepeatState] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [queue, setQueue] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const [userId, setUserId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [artists, setArtists] = useState([]);
  const [showArtists, setShowArtists] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [atHome, setAtHome] = useState(true);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken) return;
                spotifyApi.setAccessToken(accessToken);
        }, [accessToken]);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken) return;
                //spotifyApi.setAccessToken(accessToken);
                if(showAlbums == false && showArtists == false && showHistory == false && showQueue == false && showPlaylists == false && showLikedSongs == false){
                        setAtHome(true);
                }else{
                        setAtHome(false);
                }
        }, [accessToken, showAlbums, showArtists, showHistory, showQueue, showPlaylists, showLikedSongs]);

        useEffect(() => {
                if (!accessToken) return;
            
                const fetchUserData = async () => {
                    try {
                        const response = await fetch("https://api.spotify.com/v1/me", {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
            
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
            
                        const data = await response.json();
                        //alert(data.display_name); // Process the user data as needed
                        if (data && data.display_name) {
                                setUserName(data.display_name);
                        } 
                        if (data && data.images) {
                                setUserImg(data.images[0].url);
                        }
                        if(data && data.id){
                                //alert(data.id)
                                setUserId(data.id);
                        }
                    } catch (err) {
                        console.error('Error fetching user data:', err);
                    }
                };
                
                fetchUserData();
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchLikedSongs = async () => {
                        try {
                                const response = await fetch("https://api.spotify.com/v1/me/tracks", {
                                    method: "GET",
                                    headers: { Authorization: `Bearer ${accessToken}` },
                                });
                    
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                    
                                const data = await response.json();
                                //alert(data.display_name); // Process the user data as needed
                                if (data && data.items) {
                                        //alert(data.items);
                                        setLikedSongs(data.items);
                                } 
                            } catch (err) {
                                console.error('Error fetching user data:', err);
                            }
                };
                
                fetchLikedSongs();
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchQueue = async () => {
                        try {
                                const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
                                    method: "GET",
                                    headers: { Authorization: `Bearer ${accessToken}` },
                                });
                    
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                    
                                const data = await response.json();
                                if (data && data.queue) {
                                        setQueue(data.queue);
                                } 
                            } catch (err) {
                                console.error('Error fetching user data:', err);
                            }
                };
                
                fetchQueue();
        }, [accessToken, currentSong]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchRecentlyPlayed = async () => {
                        spotifyApi.getMyRecentlyPlayedTracks({
                                limit : 10
                              }).then(function(data) {
                                  // Output items
                                  //alert(data.body.items);
                                  console.log("Your 20 most recently played tracks are:");
                                  data.body.items.forEach(item => console.log(item.track.id));
                                  setRecentlyPlayed(data.body.items);
                                }, function(err) {
                                  console.log('Something went wrong!', err);
                                });
                };
                
                fetchRecentlyPlayed();
        }, [accessToken, currentSong]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchPlaylists = async () => {
                        spotifyApi.getUserPlaylists(userId)
                        .then(function(data) {
                                console.log('Retrieved playlists', data.body);
                                //alert(data.body.items);
                                setPlaylists(data.body.items);
                        },function(err) {
                                console.log('Something went wrong!', err);
                        });
                };
                
                fetchPlaylists();
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchAlbums = async () => {
                        spotifyApi.getMySavedAlbums({
                                limit : 50
                              })
                              .then(function(data) {
                                // Output items
                                console.log(data.body.items);
                                setAlbums(data.body.items);
                              }, function(err) {
                                console.log('Something went wrong!', err);
                              });
                };
                
                fetchAlbums();
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
                
                const fetchArtists = async () => {
                        spotifyApi.getFollowedArtists({ limit : 50 })
                        .then(function(data) {
                                // 'This user is following 1051 artists!'
                                //console.log('This user is following ', data.body.artists.total, ' artists!');
                                //alert(data.body.artists.items);
                                setArtists(data.body.artists.items);
                        }, function(err) {
                                console.log('Something went wrong!', err);
                        });
                };
                
                fetchArtists();
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
                //alert("SEC");
                const checkPlaybackState = () => {
                        spotifyApi.getMyCurrentPlaybackState()
                        .then(function(data) {
                        // Output items
                                if (data.body && data.body.is_playing) {
                                        console.log("User is currently playing something!");
                                        setIsPlaying(true);
                                } else {
                                        setIsPlaying(false);
                                        console.log("User is not playing anything, or doing so in private.");
                                }
                                if (data.body && data.body.shuffle_state !== undefined) {
                                        if(data.body.shuffle_state == true){
                                                setShuffle();
                                        }else{
                                                shuffleOff();
                                        }
                                }
                                if(data.body && data.body.device.volume_percent !== undefined){
                                        //alert("HELLO");
                                        setVolume(data.body.device.volume_percent);
                                }
                                if(data.body && data.body.repeat_state !== undefined){
                                        setRepeatState(data.body.repeat_state);
                                }
                        }, function(err) {
                                console.log('Something went wrong!', err);
                        });
                };

                checkPlaybackState();

                // Set up an interval to check every second
                const intervalId = setInterval(checkPlaybackState, 1000);

                // Clean up function to clear the interval when the component unmounts or accessToken changes
                return () => clearInterval(intervalId);
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken) return;
            
                const fetchCurrentTrack = async () => {
                    try {
                        const data = await spotifyApi.getMyCurrentPlayingTrack();
                        if (data.body && data.body.item) {
                            console.log('Now playing: ' + data.body.item.name);
                            setCurrentSong(data.body.item);
                        } else {
                            console.log('No track currently playing');
                            setCurrentSong(null);
                        }
                    } catch (err) {
                        console.error('Error fetching current track:', err);
                    }
                };
            
                fetchCurrentTrack();
            
                // Set up an interval to check the current track every 5 seconds
                const interval = setInterval(fetchCurrentTrack, 1000);
            
                // Cleanup function to clear the interval when the component unmounts or accessToken changes
                return () => clearInterval(interval);
            }, [accessToken]); // Only re-run the effect if accessToken changes

        useEffect(() => {
                if (!search) return setResults([]);
                if (!accessToken) return;

                let cancelRequest = false;
                spotifyApi.searchTracks(search)
                .then(function(data) {
                        console.log('Search by: ', data.body);
                        setResults(data.body.tracks.items);
                      }, function(err) {
                        console.error(err);
                });
        }, [search, accessToken]);

        const handleVolumeChange = useCallback((newVolume) => {
                setVolume(newVolume);
                if (accessToken) {
                  spotifyApi.setVolume(newVolume)
                    .then(() => {
                      console.log(`Volume set to ${newVolume}`);
                    })
                    .catch((err) => {
                      console.error('Error setting volume:', err);
                    });
                }
        }, [accessToken]);

        const pause = () => {
                spotifyApi.pause()
                .then(function() {
                        console.log('Playback paused');
                        setIsPlaying(false);
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const play = () => {
                spotifyApi.play()
                .then(function() {
                        console.log('Playback started');
                        setIsPlaying(true);
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const previous = () => {
                spotifyApi.skipToPrevious()
                .then(function() {
                        console.log('Skip to previous');
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const next = () => {
                spotifyApi.skipToNext()
                .then(function() {
                        console.log('Skip to next');
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const setShuffle = () => {
                spotifyApi.setShuffle(true)
                .then(function() {
                        //alert("HELLO");
                        console.log('Shuffle is on.');
                        setShuffleOn(true);
                }, function  (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };
        const shuffleOff = () => {
                spotifyApi.setShuffle(false)
                .then(function() {
                        setShuffleOn(false);
                        console.log('Shuffle is off.');
                }, function  (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const toggleShuffle = () => {
                if(shuffleOn){
                        shuffleOff();
                }else{
                        setShuffle();
                }
        };

        const toggleHistory = () => {
                if(showHistory == false){
                        setShowQueue(false);
                        setShowLikedSongs(false);
                        setShowPlaylists(false);
                        setShowArtists(false);
                        setShowAlbums(false);
                        setShowHistory(true);
                }else if(showHistory == true){
                        setShowHistory(false);
                }
        };

        const toggleQueue = () => {
                if(showQueue == false){
                        setShowHistory(false);
                        setShowLikedSongs(false);
                        setShowPlaylists(false);
                        setShowArtists(false);
                        setShowAlbums(false);
                        setShowQueue(true);
                }else if(showQueue == true){
                        setShowQueue(false);
                }
        };

        const toggleLikedSongs = () => {
                if(showLikedSongs == false){
                        setShowHistory(false);
                        setShowQueue(false);
                        setShowPlaylists(false);
                        setShowArtists(false);
                        setShowAlbums(false);
                        setShowLikedSongs(true);
                }else if(showLikedSongs == true){
                        setShowLikedSongs(false);
                }
        };

        const togglePlaylists = () => {
                if(showPlaylists == false){
                        setShowHistory(false);
                        setShowQueue(false);
                        setShowLikedSongs(false);
                        setShowArtists(false);
                        setShowAlbums(false);
                        setShowPlaylists(true);
                }else if(showPlaylists == true){
                        setShowPlaylists(false);
                }
        };

        const toggleArtists = () => {
                if(showArtists == false){
                        setShowHistory(false);
                        setShowQueue(false);
                        setShowLikedSongs(false);
                        setShowPlaylists(false);
                        setShowAlbums(false);
                        setShowArtists(true);
                }else if(showArtists == true){
                        setShowArtists(false);
                }
        };

        const toggleAlbums = () => {
                if(showAlbums == false){
                        setShowHistory(false);
                        setShowQueue(false);
                        setShowLikedSongs(false);
                        setShowPlaylists(false);
                        setShowArtists(false);
                        setShowAlbums(true);
                }else if(showAlbums == true){
                        setShowAlbums(false);
                }
        };

        const goHome = () => {
                setShowHistory(false);
                setShowQueue(false);
                setShowLikedSongs(false);
                setShowPlaylists(false);
                setShowArtists(false);
                setShowAlbums(false);
        };
        

        const handleSetRepeatState = (val) => {
                spotifyApi.setRepeat(val)
                .then(function () {
                        setRepeatState(val);
                        console.log('Repeat track.');
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const toggleRepeatState = () => {
                if(repeatState == "off"){
                        handleSetRepeatState("context");
                }else if(repeatState == "context"){
                        handleSetRepeatState("track");
                }else if(repeatState == "track"){
                        handleSetRepeatState("off");
                }
        };


        const convertMsToMin = (ms) => {
                const totalSeconds = Math.floor(ms / 1000); // Convert milliseconds to seconds
                const minutes = Math.floor(totalSeconds / 60); // Get minutes
                const seconds = totalSeconds % 60; // Get remaining seconds

                // Format minutes and seconds with leading zeros if needed
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };



        

  return (
        <div className="outerDiv">
                <div className="topBar">
                        <p>Spotify <i className="fa-brands fa-spotify"></i></p>
                        <Form.Control
                        type="search"
                        value={search}
                        placeholder="Artists, songs, etc..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="searchBar"
                        />
                        <div className="profileInfo">
                                <img className="profileImg" src={userImg}/>
                                <p>{userName}</p>
                        </div>
                </div>
                <div className="results">
                        <div className="leftBar">
                                <p onClick={goHome} style={{ color: atHome ? "black" : "inherit" }}>Home</p>
                                <p onClick={toggleLikedSongs} style={{ color: showLikedSongs ? "black" : "inherit" }}>liked songs</p>
                                <p onClick={togglePlaylists} style={{ color: showPlaylists ? "black" : "inherit" }}>playlists</p>
                                <p onClick={toggleArtists} style={{ color: showArtists ? "black" : "inherit" }}>artists</p>
                                <p onClick={toggleAlbums} style={{ color: showAlbums ? "black" : "inherit" }}>albums</p>
                        </div>
                        <div className="rightBar">
                                {results.length > 0 ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Search Results</p>
                                        {results.map(track => ( // Correctly wrap the map function
                                                <div className="result" key={track.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={track.album.images.length > 0 ? track.album.images[0].url : ""} alt={`Album cover for ${track.name}`} />
                                                                <div className="trackInfo">
                                                                        <p>{track.name}</p>
                                                                        <p>{track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(track.duration_ms)}</p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showHistory && recentlyPlayed ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Recently Played</p>
                                        {recentlyPlayed.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.track.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={item.track.album.images.length > 0 ? item.track.album.images[0].url : ""} alt={`Album cover for ${item.track.name}`} />
                                                                <div className="trackInfo">
                                                                        <p>{item.track.name}</p>
                                                                        <p>{item.track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(item.track.duration_ms)}</p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showQueue && queue ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Queue</p>
                                        {queue.map(track => ( // Correctly wrap the map function
                                                <div className="result" key={track.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={track.album.images.length > 0 ? track.album.images[0].url : ""} alt={`Album cover for ${track.name}`} />
                                                                <div className="trackInfo">
                                                                        <p>{track.name}</p>
                                                                        <p>{track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(track.duration_ms)}</p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showLikedSongs && likedSongs ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Liked Songs</p>
                                        {likedSongs.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.track.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={item.track.album.images[0].url} />
                                                                <div className="trackInfo">
                                                                        <p>{item.track.name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p></p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showPlaylists && playlists ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Playlists</p>
                                                {playlists.map(item => ( // Correctly wrap the map function
                                                        <div className="result" key={item.id}>
                                                                <div className="leftSearchDiv">
                                                                        <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} />
                                                                        <div className="trackInfo">
                                                                                <p>{item.name}</p>
                                                                        </div>
                                                                </div>
                                                                <div className="duration">
                                                                        <p></p>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showArtists && artists ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Artists</p>
                                        {artists.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} />
                                                                <div className="trackInfo">
                                                                        <p>{item.name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p></p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showAlbums && albums ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p>Albums</p>
                                        {albums.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.album.id}>
                                                        <div className="leftSearchDiv">
                                                                <img className="searchImg" src={item.album.images.length > 0 ? item.album.images[0].url : ""} />
                                                                <div className="trackInfo">
                                                                        <p>{item.album.name}</p>
                                                                        <p>{item.album.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p></p>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}
                        </div>
                </div>
                <div className="bottomBar">
                        <div className="leftSide">
                                {currentSong ? (
                                        <>
                                        <img className="albumArt" src={currentSong.album.images[0].url} alt={`Album cover for ${currentSong.name}`} />
                                        <div className="songInfo">
                                                <p>{currentSong.name}</p>
                                                <p>{currentSong.artists[0].name}</p>
                                        </div>
                                        </>
                                ) : (
                                        <p>None</p>
                                )}
                        </div>
                        <div className="middle">
                                <p>
                                        <i 
                                        className="fa-solid fa-shuffle"
                                        onClick={toggleShuffle}
                                        style={{ color: shuffleOn ? "black" : "inherit" }}
                                        ></i>
                                </p>
                                <p><i className="fa-solid fa-backward" onClick={previous}></i></p>
                                {isPlaying ? (
                                        <p><i className="fa-solid fa-pause" onClick={pause}></i></p>
                                ) : (
                                        <p><i className="fa-solid fa-play" onClick={play}></i></p>
                                )}
                                <p><i className="fa-solid fa-forward" onClick={next}></i></p>
                                {repeatState === "off" ? (
                                        <p><i className="fa-solid fa-repeat" onClick={toggleRepeatState}></i></p>
                                ) : repeatState === "context" ? (
                                        <p><i className="fa-solid fa-repeat" onClick={toggleRepeatState} style={{color: "black"}}></i></p>
                                ) : repeatState === "track" ? (
                                        <p><i className="fa-solid fa-circle-check" style={{color: "black"}} onClick={toggleRepeatState}></i></p>
                                ) : (
                                        <p></p>
                                )}
                                
                        </div>
                        <div className="rightSide">
                                <p><i className="fa-solid fa-clock-rotate-left" onClick={toggleHistory} style={{ color: showHistory ? "black" : "inherit" }}></i></p>
                                <p><i className="fa-solid fa-list" onClick={toggleQueue} style={{ color: showQueue ? "black" : "inherit" }}></i></p>
                                <p><i className="fa-solid fa-volume-low"></i></p>
                                <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={volume}
                                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                        className="slider" 
                                        id="myRange"
                                />
                        </div>
                </div>
        </div>
  );
}