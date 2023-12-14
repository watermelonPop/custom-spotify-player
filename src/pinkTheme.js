import { createTheme, responsiveFontSizes } from '@mui/material';
import "@fontsource/gamja-flower";

const theme = responsiveFontSizes(
  createTheme({
    name: "pink-theme",
    spacing: 4,
    typography: {
      fontFamily: "Gamja Flower",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'left',
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Gamja Flower', 
        fontStyle: 'bold',
        textAlign: 'left',
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'left',
      },
      body1: {
        fontSize: '1.8rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'justify',
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Gamja Flower', 
        textAlign: 'justify',
      }
    },
    palette: {
      background: {
        default: '#121212',
        dark: '#F7A497',
        light: '#FFFFFF',
      },
      primary: {
        main: '#F7A497',
      },
      secondary: {
        main: '#62D089',
        dark: '#457F59',
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
        primary: '#FFFFFF', 
        secondary: '#9FA0A1', 
      },
    },
  })
);

export default theme;