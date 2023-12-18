import { createTheme, responsiveFontSizes } from '@mui/material';
import "@fontsource/gamja-flower";

const theme = responsiveFontSizes(
  createTheme({
    name: "tteok-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Gamja Flower',
        borderRadius: "1rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Gamja Flower',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Gamja Flower',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Gamja Flower',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Gamja Flower',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Gamja Flower',
        textAlign: 'justify',
        fontWeight: "bold",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Gamja Flower',
        textAlign: 'justify',
        fontWeight: "bold",
      }
    },
    palette: {
      background: {
        default: '#D8E2DC',
        dark: '#FFE5D9',
        light: '#FFCAD4',
      },
      primary: {
        main: '#FFCAD4', //PINK
      },
      secondary: {
        main: '#F4ACB7', //RED
        dark: '#9D8189', //DARK
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
        secondary: '#9D8189', 
      },
    },
  })
);

export default theme;