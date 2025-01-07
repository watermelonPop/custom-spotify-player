
# Custom Spotify Web Player WEB API

This Reactjs project is a Spotify Web Player that allows users to log into spotify, browse, and play music through the site. 
The Spotify API only works for premium accounts, so free accounts cannot use this site.
This is a continuation/expansion of my previous custom spotify player repository: https://github.com/watermelonPop/spotify-web-player
Provides 6 themes for all users, and allows users to create their own themes and choose their own effects for the home page.
This is app uses a separate backend server: https://custom-web-player-server.glitch.me


## Demo
https://custom-spotify-player.vercel.app/

## Features

- Uses Spotify Web API to display the current playing music
- Users can pause, play, skip, and go back
- Search function, with separate functions for tracks, albums, and artists
- Click on any song to play it -- just like in the spotify app
- Shows listening history & queue
- Timeskip using the sliding bar
- View liked songs, playlists, artists, and albums
- Users can like or unlike any songs, artists, or albums
- Profile & Settings
    - Shows profile information, username, image, etc.
    - Users can choose between 6 themes or create a new custom theme
    - Custom themes allow users to choose colors and a font
    - Users can choose between 6 special effects to show on the background of the home page -- Uses VantaJS for special effects
- All features except for themes use the Spotify API to communicate with the database
- Themes persist through local storage -- There is a reset button to delete all created themes and return to the default theme

