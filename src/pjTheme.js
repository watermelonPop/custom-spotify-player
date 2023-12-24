import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource/vidaloka';

const theme = responsiveFontSizes(
  createTheme({
    name: "pj-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Vidaloka',
        borderRadius: "1rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Vidaloka',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Vidaloka',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Vidaloka',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Vidaloka',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Vidaloka',
        textAlign: 'justify',
        fontWeight: "bold",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Vidaloka',
        textAlign: 'justify',
        fontWeight: "bold",
      }
    },
    palette: {
      background: {
        main: '#6D98BA',
        default: '#6D98BA',
        dark: '#001D4A',
        light: '#FFFFFF',
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#294936', //light green
        dark: '#000000', //dark green
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
        secondary: '#294936', 
      },
      transitions: {
        create: () => 'all 0.3s ease', // Add your desired transition here
      },
    },
  })
);

export default theme;