import { useState, useEffect, useCallback, useRef } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import BIRDS from 'vanta/dist/vanta.birds.min';
import FOG from 'vanta/dist/vanta.fog.min';
import NET from 'vanta/dist/vanta.net.min';
import WAVES from 'vanta/dist/vanta.waves.min';
import DOTS from 'vanta/dist/vanta.dots.min';
import CELLS from 'vanta/dist/vanta.cells.min';

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
  const [queuedTrackId, setQueuedTrackId] = useState(null);
  const [likedStatus, setLikedStatus] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [trackSelection, setTrackSelection] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userFollowers, setUserFollowers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null);
  const [searchType, setSearchType] = useState("tracks");
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const [birdsEffect, setBirdsEffect] = useState(null);
  const birdsRef = useRef(null);
  const [fogEffect, setFogEffect] = useState(null);
  const fogRef = useRef(null);
  const [netEffect, setNetEffect] = useState(null);
  const netRef = useRef(null);
  const [wavesEffect, setWavesEffect] = useState(null);
  const wavesRef = useRef(null);
  const [dotsEffect, setDotsEffect] = useState(null);
  const dotsRef = useRef(null);
  const [cellsEffect, setCellsEffect] = useState(null);
  const cellsRef = useRef(null);
  const [vantaEffectTypes, setVantaEffectTypes] = useState([
        "birds", 
        "fog", 
        "net", 
        "waves", 
        "dots", 
        "cells"
]);
  const [currentVantaEffectType, setCurrentVantaEffectType] = useState("birds");
  const [themes, setThemes] = useState([
        { 
                name: "default",
                backgroundColor1: "#232723", 
                backgroundColor2: "#A8B2A8", 
                txtColor1: "white",
                txtColor2: "#232723",
                accentColor: "#457E59",
                fontFamily: '"Montserrat", sans-serif'
        },
        { 
                name: "rosy",
                backgroundColor1: "#748E54", 
                backgroundColor2: "#BEDF9D", 
                txtColor1: "#060200",
                txtColor2: "#D59083",
                accentColor: "#DDB6A9",
                fontFamily: '"Roboto Mono", serif'
        },
        { 
                name: "strawberry",
                backgroundColor1: "#FE9C9E", 
                backgroundColor2: "#FBF6EA", 
                txtColor1: "black",
                txtColor2: "black",
                accentColor: "#629460",
                fontFamily: '"Sour Gummy", serif'
        },
        { 
                name: "blue-green",
                backgroundColor1: "#294936", 
                backgroundColor2: "#D1D0A3", 
                txtColor1: "#6D98BA",
                txtColor2: "white",
                accentColor: "#001D4A",
                fontFamily: '"Playfair Display", serif'
        },
        { 
                name: "red-velvet",
                backgroundColor1: "#461220", 
                backgroundColor2: "#FED0BB", 
                txtColor1: "#FCB9B2",
                txtColor2: "black",
                accentColor: "#8C2F39",
                fontFamily: '"Quicksand", serif'
        },
        { 
                name: "tteok",
                backgroundColor1: "#9D8189", 
                backgroundColor2: "#FDE5D9", 
                txtColor1: "#F4ACB7",
                txtColor2: "black",
                accentColor: "#D8E2DC",
                fontFamily: '"Yusei Magic", serif'
        }
]);
const [currentTheme, setCurrentTheme] = useState(themes[0]);
const [selectedFont, setSelectedFont] = useState(themes[0]?.fontFamily || '');
const [themeToEdit, setThemeToEdit] = useState(null);
const [editThemeName, setEditThemeName] = useState(null);
const [editThemeBackground1, setEditThemeBackground1] = useState(null);
const [editThemeBackground2, setEditThemeBackground2] = useState(null);
const [editThemeTxt1, setEditThemeTxt1] = useState(null);
const [editThemeTxt2, setEditThemeTxt2] = useState(null);
const [editThemeAccent, setEditThemeAccent] = useState(null);


        useEffect(() => {
                if (!accessToken || !themeToEdit) return;
                document.querySelectorAll('.color-fields-edit').forEach(input => {
                        input.addEventListener('click', e => {
                        let color = "black";
                        if(input.id == "themeBackground1Change"){
                                color = themeToEdit.backgroundColor1;
                        }else if(input.id == "themeBackground2Change"){
                                color = themeToEdit.backgroundColor2;
                        }else if(input.id == "themeText1Change"){
                                color = themeToEdit.txtColor1;
                        }else if(input.id == "themeText2Change"){
                                color = themeToEdit.txtColor2;
                        }else if(input.id == "themeAccentChange"){
                                color = themeToEdit.accentColor;
                        }
                        Coloris({
                                alpha: false,
                                clearButton: true,
                                clearLabel: 'Clear',
                                swatches: [
                                        '#232723',
                                        '#A8B2A8',
                                        '#457E59',
                                        '#748E54',
                                        '#BEDF9D',
                                        '#060200',
                                        '#D59083',
                                        '#DDB6A9',
                                        '#FE9C9E',
                                        '#FBF6EA',
                                        '#629460',
                                        '#294936',
                                        '#D1D0A3',
                                        '#6D98BA',
                                        '#001D4A',
                                        '#461220',
                                        '#FED0BB',
                                        '#FCB9B2',
                                        '#8C2F39',
                                        '#9D8189',
                                        '#FDE5D9',
                                        '#F4ACB7',
                                        '#D8E2DC'
                                ],
                                defaultColor: "#000000",
                                onChange: (color) => {
                                        if(input.id == "themeBackground1Change"){
                                                setEditThemeBackground1(color);
                                        }else if(input.id == "themeBackground2Change"){
                                                setEditThemeBackground2(color);
                                        }else if(input.id == "themeText1Change"){
                                                setEditThemeTxt1(color);
                                        }else if(input.id == "themeText2Change"){
                                                setEditThemeTxt2(color);
                                        }else if(input.id == "themeAccentChange"){
                                                setEditThemeAccent(color);
                                        }
                                }
                        });
                        });
                });
        }, [accessToken, themeToEdit]);

        useEffect(() => {
                if (!accessToken) return;
                document.querySelectorAll('.color-fields').forEach(input => {
                        input.addEventListener('click', e => {
                          Coloris({
                                alpha: false,
                                clearButton: true,
                                clearLabel: 'Clear',
                                swatches: [
                                        '#232723',
                                        '#A8B2A8',
                                        '#457E59',
                                        '#748E54',
                                        '#BEDF9D',
                                        '#060200',
                                        '#D59083',
                                        '#DDB6A9',
                                        '#FE9C9E',
                                        '#FBF6EA',
                                        '#629460',
                                        '#294936',
                                        '#D1D0A3',
                                        '#6D98BA',
                                        '#001D4A',
                                        '#461220',
                                        '#FED0BB',
                                        '#FCB9B2',
                                        '#8C2F39',
                                        '#9D8189',
                                        '#FDE5D9',
                                        '#F4ACB7',
                                        '#D8E2DC'
                                      ],
                                defaultColor: '#000000'
                          });
                        });
                });
        }, [accessToken]);


        useEffect(() => {
                if (!accessToken) return;
                if(showProfile == false){
                        if(birdsEffect){
                                birdsEffect.destroy();
                                setBirdsEffect(null);
                        }
                        if(fogEffect){
                                fogEffect.destroy();
                                setFogEffect(null);
                        }
                        if(netEffect){
                                netEffect.destroy();
                                setNetEffect(null);
                        }
                        if(wavesEffect){
                                wavesEffect.destroy();
                                setWavesEffect(null);
                        }if(dotsEffect){
                                dotsEffect.destroy();
                                setDotsEffect(null);
                        }
                        if(cellsEffect){
                                cellsEffect.destroy();
                                setCellsEffect(null);
                        }
                        return;
                }
                if(!birdsEffect){
                        const birdsEff = BIRDS({
                                el: birdsRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                scale: 1.00,
                                scaleMobile: 1.00,
                                backgroundColor: currentTheme.backgroundColor2,
                                color1: currentTheme.accentColor,
                                color2: currentTheme.backgroundColor1,
                                colorMode: "lerpGradient",
                                birdSize: 1.40,
                                wingSpan: 40.00,
                                speedLimit: 4.00,
                                separation: 40.00
                        });
                        setBirdsEffect(birdsEff);
                }else{
                        if(birdsEffect){
                                birdsEffect.setOptions({
                                        backgroundColor: currentTheme.backgroundColor2,
                                        color1: currentTheme.accentColor,
                                        color2: currentTheme.backgroundColor1
                                });
                        }
                }
                if(!fogEffect){
                        const fogEff = FOG({
                                el: fogRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                highlightColor: currentTheme.txtColor1,
                                midtoneColor: currentTheme.accentColor,
                                lowlightColor: currentTheme.backgroundColor1,
                                baseColor: currentTheme.backgroundColor2,
                                blurFactor: 0.66,
                                speed: 5.00,
                                zoom: 2.40
                        });
                        setFogEffect(fogEff);
                }else{
                        if(fogEffect){
                                fogEffect.setOptions({
                                        highlightColor: currentTheme.txtColor1,
                                        midtoneColor: currentTheme.accentColor,
                                        lowlightColor: currentTheme.backgroundColor1,
                                        baseColor: currentTheme.backgroundColor2
                                });
                        }
                }
                if(!netEffect){
                        const netEff = NET({
                                el: netRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                scale: 1.00,
                                scaleMobile: 1.00,
                                color: currentTheme.accentColor,
                                backgroundColor: currentTheme.backgroundColor2,
                                points: 9.00,
                                maxDistance: 22.00,
                                spacing: 14.00
                        });
                        setNetEffect(netEff);
                }else{
                        if(netEffect){
                                netEffect.setOptions({
                                        color: currentTheme.accentColor,
                                        backgroundColor: currentTheme.backgroundColor2
                                });
                        }
                }
                if(!wavesEffect){
                        const wavesEff = WAVES({
                                el: wavesRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                scale: 1.00,
                                scaleMobile: 1.00,
                                color: currentTheme.accentColor
                        });
                        setWavesEffect(wavesEff);
                }else{
                        if(wavesEffect){
                                wavesEffect.setOptions({
                                        color: currentTheme.accentColor
                                });
                        }
                }
                if(!dotsEffect){
                        const dotsEff = DOTS({
                                el: dotsRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                scale: 1.00,
                                scaleMobile: 1.00,
                                color: currentTheme.backgroundColor1,
                                color2: currentTheme.accentColor,
                                backgroundColor: currentTheme.backgroundColor2,
                                size: 4.00,
                                spacing: 30.00
                        });
                        setDotsEffect(dotsEff);
                }else{
                        if(dotsEffect){
                                dotsEffect.setOptions({
                                        color: currentTheme.backgroundColor1,
                                        color2: currentTheme.accentColor,
                                        backgroundColor: currentTheme.backgroundColor2
                                });
                        }
                }
                if(!cellsEffect){
                        const cellsEff = CELLS({
                                el: cellsRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 100.00,
                                minWidth: 100.00,
                                scale: 1.00,
                                color1: currentTheme.backgroundColor2,
                                color2: currentTheme.accentColor,
                                size: 2.50,
                                speed: 2.40
                        });
                        setCellsEffect(cellsEff);
                }else{
                        if(cellsEffect){
                                cellsEffect.setOptions({
                                        color1: currentTheme.backgroundColor2,
                                        color2: currentTheme.accentColor
                                });
                        }
                }
        }, [showProfile, currentTheme]);

        useEffect(() => {
                if (!accessToken) return;
                if(localStorage.getItem("themes") == null){
                        localStorage.setItem("themes", JSON.stringify(themes));
                } else {
                        const storedThemes = JSON.parse(localStorage.getItem("themes"));
                        setThemes(storedThemes);
                }
                if(localStorage.getItem("currentTheme") == null){
                        localStorage.setItem("currentTheme", JSON.stringify(themes[0]));
                } else {
                        const storedCurrentTheme = JSON.parse(localStorage.getItem("currentTheme"));
                        setCurrentTheme(storedCurrentTheme);
                }
                if(localStorage.getItem("effectType") == null){
                        localStorage.setItem("effectType", "birds");
                }else{
                        const storedEffectType = localStorage.getItem("effectType");
                        setCurrentVantaEffectType(storedEffectType);
                }
        }, [accessToken]);


        useEffect(() => {
                if (currentTheme) {
                        document.documentElement.style.setProperty('--backgroundColor1', currentTheme.backgroundColor1);
                        document.documentElement.style.setProperty('--backgroundColor2', currentTheme.backgroundColor2);
                        document.documentElement.style.setProperty('--txtColor1', currentTheme.txtColor1);
                        document.documentElement.style.setProperty('--txtColor2', currentTheme.txtColor2);
                        document.documentElement.style.setProperty('--accentColor', currentTheme.accentColor);
                        document.documentElement.style.setProperty('--fontFamily', currentTheme.fontFamily);
                }
        }, [currentTheme]);

    

        useEffect(() => {
                if(!accessToken || !atHome){
                        if(vantaEffect){
                                vantaEffect.destroy();
                                setVantaEffect(null);
                        }
                        return;
                }
                if (!vantaEffect) {
                        if(currentVantaEffectType == "birds"){
                                const effect = BIRDS({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        scale: 1.00,
                                        scaleMobile: 1.00,
                                        backgroundColor: currentTheme.backgroundColor2,
                                        color1: currentTheme.accentColor,
                                        color2: currentTheme.backgroundColor1,
                                        colorMode: "lerpGradient",
                                        birdSize: 1.40,
                                        wingSpan: 40.00,
                                        speedLimit: 4.00,
                                        separation: 40.00
                                });
                        
                                setVantaEffect(effect);
                        }else if(currentVantaEffectType == "fog"){
                                const effect = FOG({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        highlightColor: currentTheme.txtColor1,
                                        midtoneColor: currentTheme.accentColor,
                                        lowlightColor: currentTheme.backgroundColor1,
                                        baseColor: currentTheme.backgroundColor2,
                                        blurFactor: 0.66,
                                        speed: 5.00,
                                        zoom: 2.40
                                });
                        
                                setVantaEffect(effect);
                        }else if(currentVantaEffectType == "net"){
                                const effect = NET({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        scale: 1.00,
                                        scaleMobile: 1.00,
                                        color: currentTheme.accentColor,
                                        backgroundColor: currentTheme.backgroundColor2,
                                        points: 9.00,
                                        maxDistance: 22.00,
                                        spacing: 14.00
                                });
                        
                                setVantaEffect(effect);
                        }else if(currentVantaEffectType == "waves"){
                                const effect = WAVES({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        scale: 1.00,
                                        scaleMobile: 1.00,
                                        color: currentTheme.accentColor
                                });
                        
                                setVantaEffect(effect);
                        }else if(currentVantaEffectType == "dots"){
                                const effect = DOTS({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        scale: 1.00,
                                        scaleMobile: 1.00,
                                        color: currentTheme.backgroundColor1,
                                        color2: currentTheme.accentColor,
                                        backgroundColor: currentTheme.backgroundColor2,
                                        size: 4.00,
                                        spacing: 30.00
                                });
                        
                                setVantaEffect(effect);
                        }else if(currentVantaEffectType == "cells"){
                                const effect = CELLS({
                                        el: myRef.current,
                                        mouseControls: true,
                                        touchControls: true,
                                        gyroControls: false,
                                        minHeight: 200.00,
                                        minWidth: 200.00,
                                        scale: 1.00,
                                        color1: currentTheme.backgroundColor2,
                                        color2: currentTheme.accentColor,
                                        size: 2.50,
                                        speed: 2.40
                                });
                        
                                setVantaEffect(effect);
                        }
                }else{
                        if(vantaEffect){
                                if(currentVantaEffectType == "birds"){
                                        vantaEffect.setOptions({
                                                backgroundColor: currentTheme.backgroundColor2,
                                                color1: currentTheme.accentColor,
                                                color2: currentTheme.backgroundColor1
                                        });
                                }else if(currentVantaEffectType == "fog"){
                                        vantaEffect.setOptions({
                                                highlightColor: currentTheme.txtColor1,
                                                midtoneColor: currentTheme.accentColor,
                                                lowlightColor: currentTheme.backgroundColor1,
                                                baseColor: currentTheme.backgroundColor2
                                        });
                                }
                                else if(currentVantaEffectType == "net"){
                                        vantaEffect.setOptions({
                                                color: currentTheme.accentColor,
                                                backgroundColor: currentTheme.backgroundColor2
                                        });
                                }
                                else if(currentVantaEffectType == "waves"){
                                        vantaEffect.setOptions({
                                                color: currentTheme.accentColor
                                        });
                                }else if(currentVantaEffectType == "dots"){
                                        vantaEffect.setOptions({
                                                color: currentTheme.backgroundColor1,
                                                color2: currentTheme.accentColor,
                                                backgroundColor: currentTheme.backgroundColor2
                                        });
                                }else if(currentVantaEffectType == "cells"){
                                        vantaEffect.setOptions({
                                                color1: currentTheme.backgroundColor2,
                                                color2: currentTheme.accentColor
                                        });
                                }
                        }
                }
        }, [atHome, vantaEffect, currentTheme, currentVantaEffectType]);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken){
                        return;
                }
                if(search == ""){
                        setResults([]);
                }
        }, [accessToken, search]);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken){
                        setIsLoading(true);
                }
        }, [accessToken]);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken) return;
                setIsLoading(false);
                spotifyApi.setAccessToken(accessToken);
        }, [accessToken]);

        useEffect(() => {
                if (!accessToken || results.length === 0) return;
            
                const fetchLikedStatus = async () => {
                    const newLikedStatus = { ...likedStatus };
                    const ids = results.map(track => track.id);
            
                    try {
                        const bools = await checkIfLiked(ids);
                        for (let i = 0; i < bools.length; i++) {
                            newLikedStatus[ids[i]] = bools[i];
                        }
                    } catch (error) {
                        console.error('Error fetching liked status for tracks:', error);
                        // Set all tracks to false in case of error
                        ids.forEach(id => newLikedStatus[id] = false);
                    }
            
                    setLikedStatus(newLikedStatus);
                };
            
                fetchLikedStatus();
        }, [accessToken, results, likedSongs]);

        useEffect(() => {
                if (!accessToken || selectedPlaylist?.tracks?.items?.length === 0) return;
            
                const fetchPlaylistLikedStatus = async () => {
                        if(selectedPlaylist !== null && selectedPlaylist?.tracks?.items){
                                const newLikedStatus = { ...likedStatus };
                                const ids = [];
                                //alert(ids);
                                for(let i = 0; i < selectedPlaylist.tracks.items.length; i++){
                                        if(selectedPlaylist.tracks.items[i].track.id !== null){
                                                ids.push(selectedPlaylist.tracks.items[i].track.id);
                                        }
                                }
                                //console.log(selectedPlaylist);
                                try {
                                        const bools = await checkIfLiked(ids);
                                        for (let i = 0; i < bools.length; i++) {
                                                newLikedStatus[ids[i]] = bools[i];
                                        }
                                } catch (error) {
                                        console.error('Error fetching liked status for tracks:', error);
                                        // Set all tracks to false in case of error
                                        ids.forEach(id => newLikedStatus[id] = false);
                                }
                        
                                setLikedStatus(newLikedStatus);
                        }else{
                                console.log("SELECTED: ");
                                console.log(selectedPlaylist);
                        }
                };      
            
                fetchPlaylistLikedStatus();
        }, [accessToken, selectedPlaylist, likedSongs]);

        useEffect(() => {
                //console.log("HERRE");
                //console.log(selectedAlbum);
                if (!accessToken || selectedAlbum?.tracks?.items?.length === 0) return;
            
                const fetchAlbumLikedStatus = async () => {
                        if(selectedAlbum !== null && selectedAlbum?.tracks?.items){
                                const newLikedStatus = { ...likedStatus };
                                const ids = [];
                                //alert(ids);
                                for(let i = 0; i < selectedAlbum.tracks.items.length; i++){
                                        if(selectedAlbum.tracks.items[i].id !== null){
                                                ids.push(selectedAlbum.tracks.items[i].id);
                                        }
                                }
                                //console.log(selectedPlaylist);
                                try {
                                        const bools = await checkIfLiked(ids);
                                        for (let i = 0; i < bools.length; i++) {
                                                newLikedStatus[ids[i]] = bools[i];
                                        }
                                } catch (error) {
                                        console.error('Error fetching liked status for tracks:', error);
                                        // Set all tracks to false in case of error
                                        ids.forEach(id => newLikedStatus[id] = false);
                                }
                        
                                setLikedStatus(newLikedStatus);
                        }else{
                                console.log("SELECTED: ");
                                console.log(selectedPlaylist);
                        }
                };      
            
                fetchAlbumLikedStatus();
        }, [accessToken, selectedAlbum, likedSongs]);

        useEffect(() => {
                if (!accessToken || recentlyPlayed.length === 0) return;
            
                const fetchLikedStatusHistory = async () => {
                    const newLikedStatus = { ...likedStatus };
                    const ids = recentlyPlayed.map(item => item.track.id);
            
                    try {
                        const bools = await checkIfLiked(ids);
                        for (let i = 0; i < bools.length; i++) {
                            newLikedStatus[ids[i]] = bools[i];
                        }
                    } catch (error) {
                        console.error('Error fetching liked status for tracks:', error);
                        // Set all tracks to false in case of error
                        ids.forEach(id => newLikedStatus[id] = false);
                    }
            
                    setLikedStatus(newLikedStatus);
                };
            
                fetchLikedStatusHistory();
        }, [accessToken, results, likedSongs]);

        

        useEffect(() => {
                if (!accessToken || queue.length === 0) return;
            
                const fetchLikedStatusQueue = async () => {
                    const newLikedStatus = { ...likedStatus };
                    const ids = queue.map(track => track.id);
            
                    try {
                        const bools = await checkIfLiked(ids);
                        for (let i = 0; i < bools.length; i++) {
                            newLikedStatus[ids[i]] = bools[i];
                        }
                    } catch (error) {
                        console.error('Error fetching liked status for tracks:', error);
                        // Set all tracks to false in case of error
                        ids.forEach(id => newLikedStatus[id] = false);
                    }
            
                    setLikedStatus(newLikedStatus);
                };
            
                fetchLikedStatusQueue();
        }, [accessToken, results, likedSongs]);

        useEffect(() => {
                //alert("TOKEN: " + accessToken);
                if (!accessToken) return;
                //spotifyApi.setAccessToken(accessToken);
                if(showAlbums == false && showArtists == false && showHistory == false && showQueue == false && showPlaylists == false && showLikedSongs == false && selectedPlaylist == null && selectedArtist == null && selectedAlbum == null && showProfile == false){
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
                        if(data && data.followers){
                                setUserFollowers(data.followers.total);
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
        }, [accessToken, currentSong, trackSelection]);

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

                        /*try {
                                //alert(userId);
                                const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                                    method: "GET",
                                    headers: { Authorization: `Bearer ${accessToken}` },
                                });
                    
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                    
                                const data = await response.json();
                                if (data) {
                                        console.log(data.items);
                                        setPlaylists(data.items);
                                } 
                            } catch (err) {
                                console.error('Error fetching user data:', err);
                            }*/
                };
                
                fetchPlaylists();
        }, [accessToken, showPlaylists]);

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
                                        document.querySelector('input[type="range"]').style.setProperty('--value', `${volume}%`);
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
                if(searchType == "tracks"){
                        spotifyApi.searchTracks(search)
                        .then(function(data) {
                                console.log('Search by: ', data.body);
                                setResults(data.body.tracks.items);
                        }, function(err) {
                                console.error(err);
                        });
                }else if(searchType == "albums"){
                        spotifyApi.searchAlbums(search)
                        .then(function(data) {
                                console.log('Search by: ', data.body);
                                setResults(data.body.albums.items);
                        }, function(err) {
                                console.error(err);
                        });
                }else if(searchType == "artists"){
                        spotifyApi.searchArtists(search)
                        .then(function(data) {
                                setResults(data.body.artists.items);
                        }, function(err) {
                                console.error(err);
                        });
                }
                
        }, [search, accessToken, searchType]);

        useEffect(() => {
                //alert(selectedArtist);
                if(selectedArtist !== null){
                        getArtistTopTracks(selectedArtist.id);  
                        getArtistAlbums(selectedArtist.id);
                }
        }, [selectedArtist]); 

        

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
                if (!accessToken) return;
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
                        setTrackSelection(null);
                }, function(err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                });
        };

        const next = () => {
                spotifyApi.skipToNext()
                .then(function() {
                        console.log('Skip to next');
                        setTrackSelection(null);
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
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setSearch("");
                        setShowProfile(false);
                        setVantaEffect(null);
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
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setSearch("");
                        setShowProfile(false);
                        setVantaEffect(null);
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
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setSearch("");
                        setShowProfile(false);
                        setVantaEffect(null);
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
                        setSearch("");
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setShowProfile(false);
                        setVantaEffect(null);
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
                        setSearch("");
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setShowProfile(false);
                        setVantaEffect(null);
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
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setSearch("");
                        setShowProfile(false);
                        setVantaEffect(null);
                        setShowAlbums(true);
                }else if(showAlbums == true){
                        setShowAlbums(false);
                }
        };

        const toggleProfile = () => {
                if(showProfile == false){
                        setShowHistory(false);
                        setShowQueue(false);
                        setShowLikedSongs(false);
                        setShowPlaylists(false);
                        setShowArtists(false);
                        setSelectedPlaylist(null);
                        setSelectedArtist(null);
                        setSelectedAlbum(null);
                        setSearch("");
                        setShowAlbums(false);
                        setVantaEffect(null);
                        setAtHome(false);
                        setShowProfile(true);
                }else if(showProfile == true){
                        setShowProfile(false);
                }
        };

        const goHome = () => {
                setShowHistory(false);
                setShowQueue(false);
                setShowLikedSongs(false);
                setShowPlaylists(false);
                setShowArtists(false);
                setShowAlbums(false);
                setSelectedPlaylist(null);
                setSelectedArtist(null);
                setSelectedAlbum(null);
                setShowProfile(false);
                setVantaEffect(null);
                setResults([]);
                setSearch("");
                setAtHome(true);
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

        const toggleLikeBtn = async (track) => {
                const bools = await checkIfLiked([track.id])
                const isLiked = bools[0];
                if(!isLiked){
                        try {
                                const val = await handleLikeSong(track);
                        } catch (error) {
                                console.error('Error fetching liked status for tracks:', error);
                                // Set all tracks to false in case of error
                                //ids.forEach(id => newLikedStatus[id] = false);
                        }  
                }else{
                        try {
                                const val = await handleUnlikeSong(track);
                        } catch (error) {
                                console.error('Error fetching liked status for tracks:', error);
                                // Set all tracks to false in case of error
                                //ids.forEach(id => newLikedStatus[id] = false);
                        } 
                }
        };


        const convertMsToMin = (ms) => {
                const totalSeconds = Math.floor(ms / 1000); // Convert milliseconds to seconds
                const minutes = Math.floor(totalSeconds / 60); // Get minutes
                const seconds = totalSeconds % 60; // Get remaining seconds

                // Format minutes and seconds with leading zeros if needed
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        const handleAddToQueue = async (uri) => {
                try {
                        const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(uri)}`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
            
                        if (!response.ok) {
                            throw new Error('Failed to add to queue');
                        }
                        else{
                                //alert("Queued");
                                setQueuedTrackId(uri);

                                // Reset the icon after 2 seconds
                                setTimeout(() => {
                                        setQueuedTrackId(null);
                                }, 2000);
                        }
                } catch (err) {
                        console.error('Error fetching user data:', err);
                }
        };

        const handleLikeSong = async (track) => {
                spotifyApi.addToMySavedTracks([track.id])
                .then(function(data) {
                        console.log('Added track!');
                        const item = {}
                        item.track = track;
                        likedSongs.push(item);
                        const newLikedStatus = { ...likedStatus };
                        newLikedStatus[track.id] = true;
                        setLikedStatus(newLikedStatus);
                        //alert("END");
                }, function(err) {
                        console.log('Something went wrong!', err);
                });
        };

        const handleUnlikeSong = async (track) => {
                spotifyApi.removeFromMySavedTracks([track.id])
                .then(function(data) {
                        const newLikedStatus = { ...likedStatus };
                        newLikedStatus[track.id] = false;
                        setLikedStatus(newLikedStatus);
                        for(let i = 0; i < likedSongs.length; i++){
                                //console.log(likedSongs[i].track.id);
                                if(likedSongs[i].track.id == track.id){
                                        likedSongs.splice(i, 1);
                                }
                        }
                }, function(err) {
                        console.log('Something went wrong!', err);
                });
        };

        const checkIfLiked = async (ids) => {
                try {
                    let idsStr = "";
                    for (let i = 0; i < ids.length; i++) {
                        idsStr += ids[i];
                        if (i < ids.length - 1) {
                            idsStr += "%2C";
                        }
                    }
            
                    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${idsStr}`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to check liked songs');
                    }
            
                    const data = await response.json();
                    return data;
                    
                } catch (err) {
                    console.error('Error fetching liked status:', err);
                    return ids.map(() => false); // Return an array of false values if there's an error
                }
        };

        useEffect(() => {
                if (!accessToken) return;
                if(currentSong && trackSelection){
                        if (currentSong.name !== trackSelection.name) {
                                next(); // Run `next()` only after `setTrackSelection` has updated the state
                        }
                }
        }, [currentSong, trackSelection]);

        const handlePlayTrack = async (track) => {
                try {
                        const val = await handleAddToQueue(track.uri);
                        //alert(val);
                        /*while(currentSong.name != track.name){
                                next();
                        }*/
                       //alert(currentSong.name);
                       //alert(track.name);
                        setTrackSelection(track);
                        //next();
                } catch (error) {
                        console.error('Error fetching liked status for tracks:', error);
                        // Set all tracks to false in case of error
                        //ids.forEach(id => newLikedStatus[id] = false);
                }  
        };

        const handleSelectPlaylist = async (item) => {
                //setSelectedPlaylist(item);
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/playlists/${item.id}`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to check liked songs');
                        }
                
                        const data = await response.json();
                        //alert(data.items);
                        if(data){
                                setSelectedPlaylist(data, () => {
                                        setShowPlaylists(false);
                                });
                        }
                } catch (err) {
                        console.error('Error fetching liked status:', err);
                }
        };

        useEffect(() => {
                if (!accessToken) return;
                if (selectedPlaylist && selectedPlaylist.id) {
                    getPlaylistTracks(selectedPlaylist);  // Fetch tracks once playlist is set
                }
        }, [selectedPlaylist, accessToken]);

        const getPlaylistTracks = async (item) => {
                // Fetch the first page of tracks
                try {
                    const response = await fetch(`https://api.spotify.com/v1/playlists/${item.id}/tracks`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to fetch playlist tracks');
                    }
            
                    let data = await response.json();
                    let allTracks = [...data.items]; // Start with the first batch of tracks
            
                    // Handle pagination: check if there is more data
                    while (data.next) {
                        const nextPageResponse = await fetch(data.next, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
            
                        if (!nextPageResponse.ok) {
                            throw new Error('Failed to fetch next page of playlist tracks');
                        }
            
                        data = await nextPageResponse.json();
                        allTracks = [...allTracks, ...data.items]; // Append the new tracks to the existing array
                    }
            
                    // Update the selectedPlaylist with all tracks
                    if (allTracks.length > 0) {
                        // Optionally, filter out tracks with missing album data
                        const validTracks = allTracks.filter(track => track.track && track.track.album);
                        selectedPlaylist.items = validTracks;
                        togglePlaylists();
                    }
                } catch (err) {
                    console.error('Error fetching playlist tracks:', err);
                }
            };
            

        const handleSelectArtist = async (item) => {
                //setSelectedPlaylist(item);
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/artists/${item.id}`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to grab artist');
                        }

                
                        const data = await response.json();
                        //alert(data.items);
                        if(data){
                                //console.log("HERE: ");
                                const currArtist = {
                                        ...data
                                };
                                setSelectedArtist(currArtist);
                                setShowHistory(false);
                                setShowQueue(false);
                                setShowLikedSongs(false);
                                setShowPlaylists(false);
                                setShowAlbums(false);
                                setSearch("");
                                setSelectedPlaylist(null);
                                setSelectedAlbum(null);
                                setShowProfile(false);
                                setShowArtists(false);
                        }
                } catch (err) {
                        console.error('Error fetching liked status:', err);
                }
        };

        const handleSelectAlbum = async (item) => {
                //setSelectedPlaylist(item);
                try {     
                        console.log("HERE");
                        console.log(item);
                        const response = await fetch(`https://api.spotify.com/v1/albums/${item.album.id}`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to grab album');
                        }

                
                        const data = await response.json();
                        //alert(data.items);
                        if(data){
                                console.log("HERE: ");
                                const currAlbum = {
                                        ...data
                                };
                                setSelectedAlbum(currAlbum);

                                setShowHistory(false);
                                setShowQueue(false);
                                setShowLikedSongs(false);
                                setShowPlaylists(false);
                                setShowAlbums(false);
                                setSearch("");
                                setSelectedPlaylist(null);
                                setShowProfile(false);
                                setShowArtists(false);
                                setSelectedArtist(null);
                        }
                } catch (err) {
                        console.error('Error fetching liked status:', err);
                }
        };

        const getArtistTopTracks = async (itemId) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/artists/${itemId}/top-tracks`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to grab artist tracks');
                        }

                
                        const data = await response.json();
                        //alert(data.items);
                        if (data) {
                                const artistTracks = {
                                    ...data,
                                    // Assuming data has a property that holds an array of tracks (e.g., `data.tracks`)
                                    topTracks: data.tracks ? data.tracks.slice(0, 5) : [], // Get the first 5 tracks
                                };

                                const newLikedStatus = { ...likedStatus };
                                const ids = [];
                                for(let i = 0; i < artistTracks.topTracks.length; i++){
                                        ids.push(artistTracks.topTracks[i].id);
                                }

                                try {
                                        const bools = await checkIfLiked(ids);
                                        for (let i = 0; i < bools.length; i++) {
                                                newLikedStatus[ids[i]] = bools[i];
                                        }
                                } catch (error) {
                                        console.error('Error fetching liked status for tracks:', error);
                                        // Set all tracks to false in case of error
                                        ids.forEach(id => newLikedStatus[id] = false);
                                }
                            
                                selectedArtist.topTracks = artistTracks.topTracks;
                                setLikedStatus(newLikedStatus);
                        }
                } catch (err) {
                        console.error('Error fetching liked status:', err);
                }
        };

        const getArtistAlbums = async (itemId) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/artists/${itemId}/albums`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                            throw new Error('Failed to grab artist tracks');
                        }

                
                        const data = await response.json();
                        //alert(data.items);
                        if(data){
                                console.log("HERE: ");
                                const artistAlbums = {
                                        ...data
                                };
                                
                                selectedArtist.albums = artistAlbums;
                                console.log(selectedArtist);
                                //setSelectedArtist(currArtist);
                                //toggleArtists();
                        }
                } catch (err) {
                        console.error('Error fetching liked status:', err);
                }
        };


        const showDropDown = (itemTrackName, event) => {
                //alert("HELLO");
                let idName = `myDropdown-${itemTrackName}`;
                let dropdown = document.getElementById(idName);
                dropdown.classList.toggle("show");

                const rect = event.target.getBoundingClientRect();
                dropdown.style.top = `${rect.bottom}px`;
                dropdown.style.left = `${rect.left - 100}px`;

                dropdown.addEventListener('mouseout', (e) => {
                        // Check if the mouse has left the dropdown area
                        if (!e.relatedTarget || !dropdown.contains(e.relatedTarget)) {
                          dropdown.classList.remove('show');
                        }
                });
        };

        const handlePlaylistSelect = (itemTrackUri) => {
                document.getElementById("myModal").style.display = "flex";
                setAddToPlaylistSong(itemTrackUri);
        };
        

        const changeTheme = (theme) => {
                setCurrentTheme(theme);
                localStorage.setItem("currentTheme", JSON.stringify(theme));
        };

        const handlePlaylistSelectClose = () => {
                document.getElementById("myModal").style.display = "none";
                setAddToPlaylistSong(null);
        };

        const handleNewThemeOpen = () => {
                document.getElementById("themeModal").style.display = "flex";
        };

        const handleNewThemeClose = () => {
                document.getElementById("themeModal").style.display = "none";
        };


        const handleAddToPlaylist = async (playlistId) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${accessToken}` },
                            body: JSON.stringify({
                                "uris": [addToPlaylistSong]
                            })
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to add to playlist: ${errorData.error.message}`);
                        }else{
                                handlePlaylistSelectClose();  
                        }
                } catch (err) {
                        console.error('Failed to add to playlist: ', err);
                }
        };

        const handleRemoveFromPlaylist = async (playlist, trackUri) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${accessToken}` },
                            body: JSON.stringify({
                                "tracks": [
                                        {"uri":trackUri}
                                ]
                            })
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to add to playlist: ${errorData.error.message}`);
                        }else{
                                handleSelectPlaylist(playlist);
                        }
                } catch (err) {
                        console.error('Failed to add to playlist: ', err);
                }
        };

        const inArtists = (artistUri) => {
                for(let i = 0; i < artists.length; i++){
                        if(artists[i].uri === artistUri){
                                return true;
                        }
                }
                return false;
        };

        const inAlbums = (albumUri) => {
                for(let i = 0; i < albums.length; i++){
                        if(albums[i].album.uri === albumUri){
                                return true;
                        }
                }
                return false;
        };

        const handleFollowArtist = async (artist) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`, {
                            method: "PUT",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to follow Artist: ${errorData.error.message}`);
                        }else{
                                spotifyApi.getFollowedArtists({ limit : 50 })
                                .then(function(data) {
                                        setArtists(data.body.artists.items);
                                }, function(err) {
                                        console.log('Something went wrong!', err);
                                });
                        }
                } catch (err) {
                        console.error('Failed to follow Artist: ', err);
                }
        };

        const handleUnfollowArtist = async (artist) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to unfollow Artist: ${errorData.error.message}`);
                        }else{
                                spotifyApi.getFollowedArtists({ limit : 50 })
                                .then(function(data) {
                                        setArtists(data.body.artists.items);
                                }, function(err) {
                                        console.log('Something went wrong!', err);
                                });
                        }
                } catch (err) {
                        console.error('Failed to unfollow Artist: ', err);
                }
        };

        const handleFollowAlbum = async (album) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/me/albums?ids=${album.id}`, {
                            method: "PUT",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to follow Album: ${errorData.error.message}`);
                        }else{
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
                        }
                } catch (err) {
                        console.error('Failed to follow Album: ', err);
                }
        };

        const handleUnfollowAlbum = async (album) => {
                try {     
                        const response = await fetch(`https://api.spotify.com/v1/me/albums?ids=${album.id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                
                        if (!response.ok) {
                                const errorData = await response.json();
                                console.error('API Error:', errorData);
                                throw new Error(`Failed to unfollow Album: ${errorData.error.message}`);
                        }else{
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
                        }
                } catch (err) {
                        console.error('Failed to unfollow Album: ', err);
                }
        };

         
        const handleCreateNewTheme = () => {
                let themeName = document.getElementById("themeNameInput").value;
                let themeBackground1 = document.getElementById("themeBackground1Input").value;
                let themeBackground2 = document.getElementById("themeBackground2Input").value;
                let themeTxt1 = document.getElementById("themeText1Input").value;
                let themeTxt2 = document.getElementById("themeText2Input").value;
                let themeAccent = document.getElementById("themeAccentInput").value;
                if(themeName == "" || themeBackground1 == "" || themeBackground2 == "" || themeTxt1 == "" || themeTxt2 == "" || themeAccent == "" || selectedFont == ""){
                        alert("Missing Info");
                }else{
                      let newTheme = { 
                        name: themeName,
                        backgroundColor1: themeBackground1, 
                        backgroundColor2: themeBackground2, 
                        txtColor1: themeTxt1,
                        txtColor2: themeTxt2,
                        accentColor: themeAccent,
                        fontFamily: selectedFont
                        }
                        themes.push(newTheme);
                        localStorage.setItem("themes", JSON.stringify(themes)); 
                        handleNewThemeClose();
                }
        };

        const handleOpenEditThemeModal = () => {
                document.getElementById("editThemeModal").style.display = "flex";
        };

        const handleCloseEditThemeModal = () => {
                document.getElementById("editThemeModal").style.display = "none";
        };

        const handleEditTheme = () => {
                let themeName = document.getElementById("themeNameChange").value;
                let themeBackground1 = document.getElementById("themeBackground1Change").value;
                let themeBackground2 = document.getElementById("themeBackground2Change").value;
                let themeTxt1 = document.getElementById("themeText1Change").value;
                let themeTxt2 = document.getElementById("themeText2Change").value;
                let themeAccent = document.getElementById("themeAccentChange").value;
                if(themeName == "" || themeBackground1 == "" || themeBackground2 == "" || themeTxt1 == "" || themeTxt2 == "" || themeAccent == "" || selectedFont == ""){
                        alert("Missing Info");
                }else{
                        for(let i = 0; i < themes.length; i++){
                                if(themes[i].name == themeToEdit.name){
                                        themes[i].name = themeName;
                                        themes[i].backgroundColor1 = themeBackground1;
                                        themes[i].backgroundColor2 = themeBackground2;
                                        themes[i].txtColor1 = themeTxt1;
                                        themes[i].txtColor2 = themeTxt2;
                                        themes[i].accentColor = themeAccent;
                                        themes[i].fontFamily = selectedFont;
                                        localStorage.setItem("themes", JSON.stringify(themes)); 
                                        handleCloseEditThemeModal();
                                        changeTheme(themes[i]);
                                        break;
                                }
                        }
                }
        };



  return (
        <div className="outerDiv">
                <div className="topBar">
                        <p className="spotifyLogo">Spotify <i className="fa-brands fa-spotify"></i></p>
                        <Form.Control
                        type="search"
                        value={search}
                        placeholder="Artists, songs, etc..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="searchBar"
                        id="search"
                        />
                        <div className="profileInfo" onClick={() => toggleProfile()}>
                                <img className="profileImg" src={userImg}/>
                                <p className="spotifyLogo" style={{ color: showProfile ? "var(--accentColor)" : "var(--txtColor1)" }}>{userName}</p>
                        </div>
                </div>
                <div className="results">
                        <div className="leftBar">
                                <p className="leftBarLinks" onClick={goHome} style={{ color: atHome ? "var(--accentColor)" : "var(--txtColor1)" }}>Home</p>
                                <p className="leftBarLinks" onClick={toggleLikedSongs} style={{ color: showLikedSongs ? "var(--accentColor)" : "var(--txtColor1)" }}>liked songs</p>
                                <p className="leftBarLinks" onClick={togglePlaylists} style={{ color: showPlaylists ? "var(--accentColor)" : "var(--txtColor1)" }}>playlists</p>
                                <p className="leftBarLinks" onClick={toggleArtists} style={{ color: showArtists ? "var(--accentColor)" : "var(--txtColor1)" }}>artists</p>
                                <p className="leftBarLinks" onClick={toggleAlbums} style={{ color: showAlbums ? "var(--accentColor)" : "var(--txtColor1)" }}>albums</p>
                        </div>
                        <div className="rightBar">
                                {isLoading == true ? ( // Check if results array has items
                                        <div className="outerLoader">
                                                <div className="loader"></div>
                                        </div>
                                ) : (
                                        <div></div>
                                )}
                                {results.length > 0 ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Search Results</p>
                                                <div className="searchTabs">
                                                        <p className={searchType == "tracks" ? "selectedSearchTab": "unselectedSearchTab"} onClick={() => setSearchType("tracks")}>
                                                                tracks
                                                        </p>
                                                        <p className={searchType == "albums" ? "selectedSearchTab": "unselectedSearchTab"} onClick={() => setSearchType("albums")}>
                                                                albums
                                                        </p>
                                                        <p className={searchType == "artists" ? "selectedSearchTab": "unselectedSearchTab"} onClick={() => setSearchType("artists")}>
                                                                artists
                                                        </p>
                                                </div>
                                                {searchType === "tracks" ? (
                                                        results.map(track => (
                                                                <div className="result" key={track.id} onClick={() => handlePlayTrack(track)}>
                                                                        <div className="leftSearchDiv">
                                                                                <div className="searchImgOuter">
                                                                                <img className="searchImg" src={track.album?.images?.length > 0 ? track.album.images[0].url : ""} alt={`Album cover for ${track.name}`} />
                                                                                </div>
                                                                                <div className="trackInfo">
                                                                                <p>{track.name}</p>
                                                                                <p>{track.artists && track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist'}</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="duration">
                                                                                <p>{convertMsToMin(track.duration_ms)}</p>
                                                                                <p><i className={likedStatus[track.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                                        e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                                        toggleLikeBtn(track); 
                                                                                }}></i></p>
                                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        showDropDown(track.name, e);
                                                                                }}></i></p>
                                                                                <div id={`myDropdown-${track.name}`} className="dropdown-content">
                                                                                        <a onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handlePlaylistSelect(track.uri);
                                                                                        }}>add to playlist</a>
                                                                                        <a onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleSelectArtist(track.artists[0]);
                                                                                        }}>go to artist</a>
                                                                                        <a onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleSelectAlbum(track);
                                                                                        }}>go to album</a>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        ))
                                                ) : (
                                                        <div></div>
                                                )}
                                                {searchType === "artists" ? (
                                                        results.map(artist => (
                                                                <div className="result" key={artist.id} onClick={() => handleSelectArtist(artist)}>
                                                                        <div className="leftSearchDiv">
                                                                                <div className="searchImgOuter">
                                                                                        <img className="searchImg" src={artist.images?.length > 0 ? artist.images[0].url : ""} alt={`Image for ${artist.name}`} />
                                                                                </div>
                                                                                <div className="trackInfo">
                                                                                        <p>{artist.name}</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="duration">
                                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        showDropDown(artist.uri, e);
                                                                                }}></i></p>
                                                                                <div id={`myDropdown-${artist.uri}`} className="dropdown-content">
                                                                                        <a onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                        }}>
                                                                                                {inArtists(artist.uri) == true ? ( // Check if results array has items
                                                                                                        <p onClick={() => handleUnfollowArtist(artist)}>
                                                                                                                unfollow
                                                                                                        </p>
                                                                                                ) : (
                                                                                                        <p onClick={() => handleFollowArtist(artist)}>
                                                                                                                follow
                                                                                                        </p>
                                                                                                )}
                                                                                        
                                                                                        </a>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        ))
                                                ) : (
                                                        <div></div>
                                                )}
                                                {searchType === "albums" ? (
                                                        results.map(album => (
                                                                <div className="result" key={album.id} onClick={() => {
                                                                        let item = {};
                                                                        item.album = album;
                                                                        handleSelectAlbum(item);
                                                                    }}>
                                                                        <div className="leftSearchDiv">
                                                                                <div className="searchImgOuter">
                                                                                        <img className="searchImg" src={album.images?.length > 0 ? album.images[0].url : ""} alt={`Image for ${album.name}`} />
                                                                                </div>
                                                                                <div className="trackInfo">
                                                                                        <p>{album.name}</p>
                                                                                        <p>{album.artists && album.artists.length > 0 ? album.artists[0].name : 'Unknown Artist'}</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="duration">
                                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        showDropDown(album.uri, e);
                                                                                }}></i></p>
                                                                                <div id={`myDropdown-${album.uri}`} className="dropdown-content">
                                                                                        {inAlbums(album.uri)==true ? 
                                                                                                <a onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        handleUnfollowAlbum(album);
                                                                                                }}>unsave</a> 
                                                                                                : 
                                                                                                <a onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        handleFollowAlbum(album);
                                                                                                }}>save</a> 
                                                                                        }
                                                                                        <a onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleSelectArtist(album.artists[0]);
                                                                                        }}>go to artist</a>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        ))
                                                ) : (
                                                        <div></div>
                                                )}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showHistory && recentlyPlayed ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Recently Played</p>
                                        {recentlyPlayed.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.track.id} onClick={() => handlePlayTrack(item.track)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item.track.album.images.length > 0 ? item.track.album.images[0].url : ""} alt={`Album cover for ${item.track.name}`} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.track.name}</p>
                                                                        <p>{item.track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(item.track.duration_ms)}</p>
                                                                <p><i className={likedStatus[item.track.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                        e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                        toggleLikeBtn(item.track); 
                                                                }}></i></p>
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.track.uri, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${item.track.uri}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handlePlaylistSelect(item.track.uri);
                                                                        }}>add to playlist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectArtist(item.track.artists[0]);
                                                                        }}>go to artist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectAlbum(item.track);
                                                                        }}>go to album</a>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showQueue && queue ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Queue</p>
                                        {queue.map(track => ( // Correctly wrap the map function
                                                <div className="result" key={track.id} onClick={() => handlePlayTrack(track)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={track.album.images.length > 0 ? track.album.images[0].url : ""} alt={`Album cover for ${track.name}`} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{track.name}</p>
                                                                        <p>{track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(track.duration_ms)}</p>
                                                                <p><i className={likedStatus[track.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                        e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                        toggleLikeBtn(track); 
                                                                }}></i></p>
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(track.uri, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${track.uri}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handlePlaylistSelect(track.uri);
                                                                        }}>add to playlist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectArtist(track.artists[0]);
                                                                        }}>go to artist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectAlbum(track);
                                                                        }}>go to album</a>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showLikedSongs && likedSongs ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Liked Songs</p>
                                        {likedSongs.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.track.id} onClick={() => handlePlayTrack(item.track)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item?.track?.album?.images[0].url} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.track.name}</p>
                                                                        <p>{item.track.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{convertMsToMin(item.track.duration_ms)}</p>
                                                                <p><i className="fa-solid fa-heart" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleLikeBtn(item.track);
                                                                }}></i></p>
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.track.name, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${item.track.name}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handlePlaylistSelect(item.track.uri);
                                                                        }}>add to playlist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectArtist(item.track.artists[0]);
                                                                        }}>go to artist</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectAlbum(item.track);
                                                                        }}>go to album</a>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showPlaylists && playlists ? ( // Check if results array has items
                                <div className="outerSearchResults">
                                        <p className="title">Playlists</p>
                                        {playlists.map(item => { // Correctly wrap the map function
                                        if (item) {
                                                return (
                                                <div className="result" key={item.id} onClick={() => handleSelectPlaylist(item)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} alt={item.name} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p>{item.tracks.total} songs</p>
                                                        </div>
                                                </div>
                                                );
                                        }
                                        return null; // Return null if the item is invalid
                                        })}
                                </div>
                                ) : (
                                <div></div>
                                )}


                                {selectedPlaylist && playlists ? ( // Check if selectedPlaylist and playlists exist
                                <div className="outerSearchResults">
                                        <div className="outerPlaylistDisplay">
                                                <div className="playlistDisplayLeft">
                                                        <div className="innerPlaylistImgDiv">
                                                                <img className="searchImg" src={selectedPlaylist.images[0].url}/>
                                                        </div>
                                                </div>
                                                <div className="playlistDisplayRight">
                                                        <p className="title">{selectedPlaylist.name}</p>
                                                        
                                                        {selectedPlaylist.items && selectedPlaylist.items.length > 0 && ( // Check if items exist and have length
                                                        <p className="subtitle">{selectedPlaylist.items.length} songs</p>
                                                        )}
                                                </div>
                                        </div>
                                        
                                        {selectedPlaylist.items && selectedPlaylist.items.map(item => ( // Map through items if they exist
                                        <div className="result" key={item.track.id} onClick={() => handlePlayTrack(item.track)}>
                                                <div className="leftSearchDiv">
                                                        <div className="searchImgOuter">
                                                                <img className="searchImg" src={item.track.album.images.length > 0 ? item.track.album.images[0].url : ""} />
                                                        </div>
                                                        <div className="trackInfo">
                                                                <p>{item.track.name}</p>
                                                        </div>
                                                </div>
                                                <div className="duration">
                                                        <p>{convertMsToMin(item.track.duration_ms)}</p>
                                                        <p><i className={likedStatus[item.track.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                toggleLikeBtn(item.track); 
                                                        }}></i></p>
                                                        <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.track.name, e);
                                                                }}></i></p>
                                                        <div id={`myDropdown-${item.track.name}`} className="dropdown-content">
                                                                <a onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveFromPlaylist(selectedPlaylist, item.track.uri);
                                                                }}>remove from playlist</a>
                                                                
                                                                <a onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handlePlaylistSelect(item.track.uri);
                                                                }}>add to playlist</a>
                                                                <a onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleSelectArtist(item.track.artists[0]);
                                                                }}>go to artist</a>
                                                                <a onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleSelectAlbum(item.track);
                                                                }}>go to album</a>
                                                        </div>
                                                </div>
                                        </div>
                                        ))}
                                </div>
                                ) : (
                                <div></div>
                                )}


                                {showArtists && artists ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Artists</p>
                                        {artists.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.id} onClick={() => handleSelectArtist(item)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.name, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${item.name}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                        }}>
                                                                                {inArtists(item.uri) == true ? ( // Check if results array has items
                                                                                        <p onClick={() => handleUnfollowArtist(item)}>
                                                                                                unfollow
                                                                                        </p>
                                                                                ) : (
                                                                                        <p onClick={() => handleFollowArtist(item)}>
                                                                                                follow
                                                                                        </p>
                                                                                )}
                                                                        
                                                                        </a>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {selectedArtist && artists && selectedArtist.topTracks ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <div className="outerPlaylistDisplay">
                                                        <div className="playlistDisplayLeft">
                                                                <div className="innerPlaylistImgDiv">
                                                                        <img className="searchImg" src={selectedArtist.images[0].url} />
                                                                </div>
                                                        </div>
                                                        <div className="playlistDisplayRight">
                                                                <p className="title">{selectedArtist.name}</p>
                                                                <p className="subtitle">{selectedArtist.followers.total} followers</p>
                                                                {inArtists(selectedArtist.uri) == true ? ( // Check if results array has items
                                                                        <p className="followingArtistBtn" onClick={() => handleUnfollowArtist(selectedArtist)}>
                                                                                following
                                                                        </p>
                                                                ) : (
                                                                        <p className="followArtistBtn" onClick={() => handleFollowArtist(selectedArtist)}>
                                                                                follow
                                                                        </p>
                                                                )}
                                                        </div>
                                                </div>
                                                <p className="title">Top Songs</p>
                                                {selectedArtist.topTracks.map(item => ( // Correctly wrap the map function
                                                        <div className="result" key={item.id} onClick={() => handlePlayTrack(item)}>
                                                                <div className="leftSearchDiv">
                                                                        <div className="searchImgOuter">
                                                                                <img className="searchImg" src={item.album.images.length > 0 ? item.album.images[0].url : ""} />
                                                                        </div>
                                                                        <div className="trackInfo">
                                                                                <p>{item.name}</p>
                                                                        </div>
                                                                </div>
                                                                <div className="duration">
                                                                        <p>{convertMsToMin(item.duration_ms)}</p>
                                                                        <p><i className={likedStatus[item.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                                e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                                toggleLikeBtn(item);
                                                                        }}></i></p>
                                                                        <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                showDropDown(item.uri, e);
                                                                        }}></i></p>
                                                                        <div id={`myDropdown-${item.uri}`} className="dropdown-content">
                                                                                <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handlePlaylistSelect(item.uri);
                                                                                }}>add to playlist</a>
                                                                                <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleSelectAlbum(item);
                                                                                }}>go to album</a>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                                <p className="title">Albums</p>
                                                {selectedArtist?.albums?.items?.length > 0 ? (
                                                        selectedArtist.albums.items.map(item => (
                                                        <div className="result" key={item.id} onClick={() => { 
                                                        let temp = { album: { ...item, id: item.id } };
                                                        handleSelectAlbum(temp); 
                                                        }}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} alt={item.name} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.uri, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${item.uri}`} className="dropdown-content">
                                                                        {inAlbums(item.uri) == true ? ( // Check if results array has items
                                                                                <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleUnfollowAlbum(item);
                                                                                        document.getElementById(`myDropdown-${item.uri}`).classList.remove('show');
                                                                                }}><i className="fa-solid fa-circle-check"></i> unsave</a>
                                                                        ) : (
                                                                                <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleFollowAlbum(item);
                                                                                        document.getElementById(`myDropdown-${item.uri}`).classList.remove('show');
                                                                                }}><i className="fa-solid fa-circle-plus"></i> save</a>
                                                                        )}
                                                                </div>
                                                        </div>
                                                        </div>
                                                        ))
                                                        ) : (
                                                        <p>No albums found.</p>
                                                )}
                                                
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showAlbums && albums ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <p className="title">Albums</p>
                                        {albums.map(item => ( // Correctly wrap the map function
                                                <div className="result" key={item.album.id} onClick={() => handleSelectAlbum(item)}>
                                                        <div className="leftSearchDiv">
                                                                <div className="searchImgOuter">
                                                                        <img className="searchImg" src={item.album.images.length > 0 ? item.album.images[0].url : ""} />
                                                                </div>
                                                                <div className="trackInfo">
                                                                        <p>{item.album.name}</p>
                                                                        <p>{item.album.artists[0].name}</p>
                                                                </div>
                                                        </div>
                                                        <div className="duration">
                                                                <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        showDropDown(item.album.uri, e);
                                                                }}></i></p>
                                                                <div id={`myDropdown-${item.album.uri}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleUnfollowAlbum(item.album);
                                                                        }}>unsave</a>
                                                                        <a onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSelectArtist(item.album.artists[0]);
                                                                        }}>go to artist</a>
                                                                        
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {selectedAlbum ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <div className="outerPlaylistDisplay">
                                                        <div className="playlistDisplayLeft">
                                                                <div className="innerPlaylistImgDiv">
                                                                        <img className="searchImg" src={selectedAlbum.images.length > 0 ? selectedAlbum.images[0].url : ""} />
                                                                </div>
                                                        </div>
                                                        <div className="playlistDisplayRight">
                                                                <p className="title">{selectedAlbum.name}</p>
                                                                <p className="subtitle">
                                                                {selectedAlbum.artists.length === 1
                                                                        ? selectedAlbum.artists[0].name
                                                                        : selectedAlbum.artists.length > 1
                                                                        ? selectedAlbum.artists.map((artist, index) => {
                                                                                // Join artist names with & symbol
                                                                                return (
                                                                                <span key={artist.id}>
                                                                                {artist.name}
                                                                                {index < selectedAlbum.artists.length - 1 && ' & '}
                                                                                </span>
                                                                                );
                                                                        })
                                                                        : ""}
                                                                </p>
                                                                <p className="subtitle">{new Date(selectedAlbum.release_date).getFullYear()}</p>
                                                                <p className="subtitle">{selectedAlbum.total_tracks} songs</p>
                                                                {inAlbums(selectedAlbum.uri) == true ? ( // Check if results array has items
                                                                        <p className="followingAlbumBtn" onClick={() => handleUnfollowAlbum(selectedAlbum)}>
                                                                                <i className="fa-solid fa-circle-check"></i>
                                                                                saved
                                                                        </p>
                                                                ) : (
                                                                        <p className="followAlbumBtn">
                                                                                <i className="fa-solid fa-circle-plus" onClick={() => handleFollowAlbum(selectedAlbum)}></i>
                                                                                save
                                                                        </p>
                                                                )}
                                                        </div>
                                                </div>
                                                {selectedAlbum.tracks.items.map(item => ( // Correctly wrap the map function
                                                        <div className="result" key={item.id} onClick={() => handlePlayTrack(item)}>
                                                                <div className="leftSearchDiv">
                                                                        <div className="searchImgOuter">
                                                                                <img className="searchImg" src={selectedAlbum.images.length > 0 ? selectedAlbum.images[0].url : ""} />
                                                                        </div>
                                                                        <div className="trackInfo">
                                                                                <p>{item.name}</p>
                                                                        </div>
                                                                </div>
                                                                <div className="duration">
                                                                        <p>{convertMsToMin(item.duration_ms)}</p>
                                                                        <p><i className={likedStatus[item.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"} onClick={(e) => { 
                                                                                e.stopPropagation(); // Prevent handlePlayTrack from being triggered
                                                                                toggleLikeBtn(item); 
                                                                        }}></i></p>
                                                                        <p><i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                showDropDown(item.uri, e);
                                                                        }}></i></p>
                                                                        <div id={`myDropdown-${item.uri}`} className="dropdown-content">
                                                                        <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handlePlaylistSelect(item.uri);
                                                                                }}>add to playlist</a>
                                                                                <a onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleSelectArtist(item.artists[0]);
                                                                                }}>go to artist</a>
                                                                                
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {showProfile ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <div className="outerPlaylistDisplay">
                                                        <div className="playlistDisplayLeft">
                                                                <div className="innerPlaylistImgDiv">
                                                                        <img className="searchImg" src={userImg} />
                                                                </div>
                                                        </div>
                                                        <div className="playlistDisplayRight">
                                                                <p className="title">{userName}</p>
                                                                <p className="subtitle">{userFollowers} followers</p>
                                                        </div>
                                                </div>
                                                <p className="title">Themes</p>
                                                <div className="themesContainer">
                                                        <div className="outerThemesDiv">
                                                                {themes.map(theme => (
                                                                        <div key={theme.name} className="themeDiv" onClick={(e) => { 
                                                                                changeTheme(theme);
                                                                        }} style={{ 
                                                                                borderColor: theme.name === currentTheme.name ? theme.txtColor2 : "transparent"
                                                                        }}>
                                                                                <div className="themeColorDiv" style={{ backgroundColor: theme.backgroundColor1 }}>
                                                                                        <p className="editThemeBtn"><i className="fa-solid fa-pen-to-square" onClick={(e) => { 
                                                                                                e.stopPropagation();
                                                                                                setThemeToEdit(theme);
                                                                                                setSelectedFont(theme.fontFamily);
                                                                                                setEditThemeName(theme.name);
                                                                                                setEditThemeBackground1(theme.backgroundColor1);
                                                                                                setEditThemeBackground2(theme.backgroundColor2);
                                                                                                setEditThemeTxt1(theme.txtColor1);
                                                                                                setEditThemeTxt2(theme.txtColor2);
                                                                                                setEditThemeAccent(theme.accentColor);
                                                                                                handleOpenEditThemeModal();
                                                                                        }}></i></p>
                                                                                </div>
                                                                                <div className="themeColorDiv" style={{ backgroundColor: theme.backgroundColor2 }}></div>
                                                                                <div className="themeColorDiv" style={{ backgroundColor: theme.txtColor1 }}>
                                                                                        <p style={{ fontFamily: theme.fontFamily }}>{theme.name}</p>
                                                                                </div>
                                                                                <div className="themeColorDiv" style={{ backgroundColor: theme.txtColor2 }}></div>
                                                                                <div className="themeColorDiv" style={{ backgroundColor: theme.accentColor }}></div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                        <div className="themeBtns">
                                                                <p className="themeBtn" onClick={() => { 
                                                                                        handleNewThemeOpen();
                                                                                }}>+ new theme</p>
                                                                <p className="themeBtn" onClick={() => { 
                                                                                localStorage.clear();
                                                                                window.location.reload();
                                                                        }}>reset</p>
                                                        </div>
                                                </div>
                                                <p className="title">Effects</p>
                                                <div className="outerTypesDiv">
                                                        {vantaEffectTypes.map(type => (
                                                                <div className = "outerTypeDiv" style={{ 
                                                                        borderColor: type === currentVantaEffectType ? currentTheme.txtColor2 : currentTheme.backgroundColor2
                                                                }}>
                                                                        <div key={type} className="typeDiv" onClick={(e) => { 
                                                                                setCurrentVantaEffectType(type);
                                                                                localStorage.setItem("effectType", type);
                                                                        }} ref={
                                                                                type === "birds" ? birdsRef :
                                                                                type === "fog" ? fogRef :
                                                                                type === "net" ? netRef :
                                                                                type === "waves" ? wavesRef :
                                                                                type === "dots" ? dotsRef :
                                                                                type === "cells" ? cellsRef :
                                                                                null
                                                                        }>
                                                                                <p>{type}</p>
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                {atHome ? ( // Check if results array has items
                                        <div className="outerSearchResults">
                                                <div id="homeDesign" ref={myRef}>
                                                        <div className="onTopHomeDiv">
                                                                <div className="innerHomeDiv" onClick={toggleLikedSongs}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-heart"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>liked<br/>songs</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="innerHomeDiv" onClick={() => toggleProfile()}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-user"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>profile</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="innerHomeDiv" onClick={() => toggleProfile()}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-gear"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>settings</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="onTopHomeDiv">
                                                                <div className="innerHomeDiv" onClick={togglePlaylists}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-list"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>playlists</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="innerHomeDiv" onClick={toggleAlbums}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-compact-disc"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>albums</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="innerHomeDiv" onClick={toggleArtists}>
                                                                        <div className="flip-card-inner">
                                                                                <div className="flip-card-front">
                                                                                        <p><i className="fa-solid fa-palette"></i></p>
                                                                                </div>
                                                                                <div className="flip-card-back">
                                                                                        <p>artists</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                ) : (
                                        <div></div>
                                )}

                                <div id="myModal" className="modal">
                                        <div className="modal-content">
                                                <span className="close" onClick={handlePlaylistSelectClose}>&times;</span>
                                                <p className="title">Playlists</p>
                                                {playlists.map(item => { // Correctly wrap the map function
                                                        if (item) {
                                                                return (
                                                                <div className="result" key={item.id} onClick={(e) => { 
                                                                        handleAddToPlaylist(item.id); 
                                                                }}>
                                                                        <div className="leftSearchDiv">
                                                                                <div className="searchImgOuter">
                                                                                        <img className="searchImg" src={item.images.length > 0 ? item.images[0].url : ""} alt={item.name} />
                                                                                </div>
                                                                                <div className="trackInfo">
                                                                                        <p>{item.name}</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="duration">
                                                                                <p>{item.tracks.total} songs</p>
                                                                                <p><i className="fa-solid fa-ellipsis-vertical"></i></p>
                                                                        </div>
                                                                </div>
                                                                );
                                                        }
                                                        return null; // Return null if the item is invalid
                                                })}
                                        </div>
                                </div>

                                <div id="themeModal" className="modal">
                                        <div className="modal-content">
                                                <span className="close" onClick={() => { 
                                                                handleNewThemeClose();   
                                                                }}>&times;</span>
                                                <p className="title">New Theme</p>
                                                <div className="themeFormDiv">
                                                        <div className="themeFormItemDiv">
                                                                <p>Name: </p>
                                                                <input type="text" className="themeFormInput" id="themeNameInput"></input>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Background Color 1: </p>
                                                                <div className="color-fields-outer">
                                                                        <input id="themeBackground1Input" type="text" data-coloris className="color-fields"></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Background Color 2: </p>
                                                                <div className="color-fields-outer">
                                                                        <input id="themeBackground2Input" type="text" data-coloris className="color-fields"></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Text Color 1: </p>
                                                                <div className="color-fields-outer">
                                                                        <input id="themeText1Input" type="text" data-coloris className="color-fields"></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Text Color 2: </p>
                                                                <div className="color-fields-outer">
                                                                        <input id="themeText2Input" type="text" data-coloris className="color-fields"></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Accent Color: </p>
                                                                <div className="color-fields-outer">
                                                                        <input id="themeAccentInput" type="text" data-coloris className="color-fields"></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Font: </p>
                                                                <select className="themeFormSelect" style={{ fontFamily: selectedFont }}
                                                                        value={selectedFont}
                                                                        onChange={(e) => setSelectedFont(e.target.value)}>
                                                                        {themes.map(theme => { // Correctly wrap the map function
                                                                                if (theme) {
                                                                                        return (
                                                                                                <option key={theme.fontFamily} value={theme.fontFamily}>{theme.fontFamily}</option>
                                                                                        );
                                                                                }
                                                                                return null; // Return null if the item is invalid
                                                                        })}
                                                                </select>
                                                        </div>
                                                </div>
                                                <div className="themeFormSubmitDiv">
                                                        <p className="themeFormSubmit" onClick={() => { 
                                                                handleCreateNewTheme();  
                                                                }}>create</p>
                                                </div>
                                        </div>
                                </div>

                                <div id="editThemeModal" className="modal">
                                        <div className="modal-content">
                                                <span className="close" onClick={() => { 
                                                                handleCloseEditThemeModal();
                                                                }}>&times;</span>
                                                {themeToEdit != null ? (
                                                        <>
                                                        <p className="title">Edit {themeToEdit.name} Theme</p>
                                                        <div className="themeFormDiv">
                                                        <div className="themeFormItemDiv">
                                                                <p>Name: </p>
                                                                <input type="text" className="themeFormInput" id="themeNameChange" value={editThemeName} onChange={(e) => setEditThemeName(e.target.value)} />
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Background Color 1: </p>
                                                                <div className="color-fields-outer">
                                                                <input id="themeBackground1Change" type="text" data-coloris className="color-fields-edit" value={editThemeBackground1}></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Background Color 2: </p>
                                                                <div className="color-fields-outer">
                                                                <input id="themeBackground2Change" type="text" data-coloris className="color-fields-edit" value={editThemeBackground2}></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Text Color 1: </p>
                                                                <div className="color-fields-outer">
                                                                <input id="themeText1Change" type="text" data-coloris className="color-fields-edit" value={editThemeTxt1}></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Text Color 2: </p>
                                                                <div className="color-fields-outer">
                                                                <input id="themeText2Change" type="text" data-coloris className="color-fields-edit" value={editThemeTxt2}></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Accent Color: </p>
                                                                <div className="color-fields-outer">
                                                                <input id="themeAccentChange" type="text" data-coloris className="color-fields-edit" value={editThemeAccent}></input>
                                                                </div>
                                                        </div>
                                                        <div className="themeFormItemDiv">
                                                                <p>Font: </p>
                                                                <select 
                                                                className="themeFormSelect" 
                                                                style={{ fontFamily: selectedFont }}
                                                                value={selectedFont}
                                                                onChange={(e) => setSelectedFont(e.target.value)}
                                                                >
                                                                        {themes.map(theme => {
                                                                        if (theme) {
                                                                        return (
                                                                                <option key={theme.fontFamily} value={theme.fontFamily}>
                                                                                {theme.fontFamily}
                                                                                </option>
                                                                        );
                                                                        }
                                                                        return null;
                                                                        })}
                                                                </select>
                                                        </div>
                                                        </div>
                                                        <div className="themeFormSubmitDiv">
                                                                <p className="themeFormSubmit" onClick={() => { 
                                                                        handleEditTheme();
                                                                }}>
                                                                        done
                                                                </p>
                                                        </div>
                                                        </>
                                                        ) : (
                                                        <p></p>
                                                        )}
                                                
                                                
                                        </div>
                                </div>
                                
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
                                        style={{ color: shuffleOn ? "var(--accentColor)" : "var(--txtColor1)" }}
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
                                        <p><i className="fa-solid fa-repeat" onClick={toggleRepeatState} style={{color: "var(--accentColor)"}}></i></p>
                                ) : repeatState === "track" ? (
                                        <p><i className="fa-solid fa-circle-check" style={{color: "var(--accentColor)"}} onClick={toggleRepeatState}></i></p>
                                ) : (
                                        <p></p>
                                )}
                                
                        </div>
                        <div className="rightSide">
                                <p><i className="fa-solid fa-clock-rotate-left" onClick={toggleHistory} style={{ color: showHistory ? "var(--accentColor)" : "inherit" }}></i></p>
                                <p><i className="fa-solid fa-list" onClick={toggleQueue} style={{ color: showQueue ? "var(--accentColor)" : "inherit" }}></i></p>
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