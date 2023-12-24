import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource/spectral';

const theme = responsiveFontSizes(
  createTheme({
    name: "amb-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Spectral',
        borderRadius: "1rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Spectral',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Spectral',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Spectral',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Spectral',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Spectral',
        textAlign: 'justify',
        fontWeight: "bold",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Spectral',
        textAlign: 'justify',
        fontWeight: "bold",
      }
    },
    palette: {
      background: {
        main: '#1F1F1F',
        default: '#1F1F1F',
        dark: '#CDF7F6',
        light: '#FFFFFF',
      },
      primary: {
        main: '#FBBFCA',
      },
      secondary: {
        main: '#EF798A',
        dark: '#B14359',
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
        main: '#FFFFFF', 
        primary: '#FFFFFF', 
        secondary: '#CCC9E7', 
      },
      transitions: {
        create: () => 'all 0.3s ease', // Add your desired transition here
      },
    },
  })
);


/*
palette: {
          background: {
            main: selectedColorsValidated.primaryBg,
            default: selectedColorsValidated.primaryBg,
            dark: selectedColorsValidated.secondaryBg,
            light: '#FFFFFF',
          },
          primary: {
            main: selectedColorsValidated.playBtns,
          },
          secondary: {
            main: selectedColorsValidated.primaryBtns,
            dark: selectedColorsValidated.touchBar,
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
            main: selectedColorsValidated.primaryTxt,
            primary: selectedColorsValidated.primaryTxt, 
            secondary: selectedColorsValidated.secondaryTxt, 
          },
        },
*/

export default theme;