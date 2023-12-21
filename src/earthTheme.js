import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource-variable/nunito';

const theme = responsiveFontSizes(
  createTheme({
    name: "earth-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Nunito Variable',
        borderRadius: "0rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Nunito Variable',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Nunito Variable',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Nunito Variable',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Nunito Variable',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Nunito Variable',
        textAlign: 'justify',
        fontWeight: "normal",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Nunito Variable',
        textAlign: 'justify',
        fontWeight: "normal",
      }
    },
    palette: {
      background: {
        main: "#475841",
        default: "#475841",
        dark: "#3F403F",
        light: '#FFFFFF',
      },
      primary: {
        main: "#9FB8AD",
      },
      secondary: {
        main: "#9FB8AD",
        dark: "#CED0CE",
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
        main: "#FFFFFF",
        primary: "#FFFFFF", 
        secondary: "#E6E8E6", 
      },
    },
  })
);

export default theme;