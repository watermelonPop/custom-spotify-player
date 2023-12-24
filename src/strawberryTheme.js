import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource/courier-prime';

const theme = responsiveFontSizes(
  createTheme({
    name: "strawberry-theme",
    spacing: 4,
    typography: {
      fontFamily: 'Courier Prime',
      borderRadius: "1rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Courier Prime',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Courier Prime',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Courier Prime',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Courier Prime',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Courier Prime',
        textAlign: 'justify',
        fontWeight: "bold",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Courier Prime',
        textAlign: 'justify',
        fontWeight: "bold",
      }
    },
    palette: {
      background: {
        main: '#f0465b',
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
        main: '#000000', 
        primary: '#000000', 
        secondary: '#fef8e6', 
      },
      transitions: {
        create: () => 'all 0.3s ease', // Add your desired transition here
      },
    },
  })
);

export default theme;