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

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken) return;
                spotifyApi.setAccessToken(accessToken);
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



        

  return (
        <div className="outerDiv">
                <div className="topBar">
                        <p>Spotify <i className="fa-brands fa-spotify"></i></p>
                        <Form.Control
                        type="search"
                        value={search}
                        placeholder="Artists, songs, etc..."
                        onChange={(e) => setSearch(e.target.value)}
                        style={{width: "60%", height: "90%"}}
                        />
                </div>
                <div className="results">
                        {results ? (
                                results.map(track => (
                                <div className="result" key={track.id}>{track.name} by {track.artists[0].name}</div>
                                ))
                        ) : (
                                <div>No results found</div>
                        )}
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