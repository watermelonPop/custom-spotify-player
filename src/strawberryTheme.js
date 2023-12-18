import { createTheme, responsiveFontSizes } from '@mui/material';
import "@fontsource/gamja-flower";

const theme = responsiveFontSizes(
  createTheme({
    name: "strawberry-theme",
    spacing: 4,
    typography: {
      fontFamily: "Gamja Flower",
      borderRadius: "1rem",
      h1: {
        fontSize: '4rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'left',
      },
      h2: {
        fontSize: '3.5rem',
        fontFamily: 'Gamja Flower', 
        fontStyle: 'bold',
        textAlign: 'left',
      },
      h3: {
        fontSize: '3.0rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'left',
      },
      body1: {
        fontSize: '2.3rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'justify',
      },
      subtitle1:{
        fontSize: '1.8rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'justify',
      }
    },
    palette: {
      background: {
        default: '#f0465b',
        dark: '#f6838c',
        light: '#000000',
      },
      primary: {
        main: '#a4d18d', //light green
      },
      secondary: {
        main: '#fef8e6', //cream
        dark: '#00563b', //dark green
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
        primary: '#000000', 
        secondary: '#fef8e6', 
      },
    },
  })
);

export default theme;