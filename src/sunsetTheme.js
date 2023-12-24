import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource-variable/oswald';

const theme = responsiveFontSizes(
  createTheme({
    name: "sunset-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Oswald Variable',
        borderRadius: "1rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'left',
        fontWeight: "normal",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'left',
        fontWeight: "normal",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'left',
        fontWeight: "normal",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'left',
        fontWeight: "normal",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'justify',
        fontWeight: "normal",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Oswald Variable',
        textAlign: 'justify',
        fontWeight: "normal",
      }
    },
    //primaryBg: F4978E
    //secondaryBg: F08080
    //playBtns: FBC4AB
    //primaryBtns: FBC4AB
    //touchBar: FFDAB9
    //primaryTxt: 000000
    //secondaryTxt: 626365
    palette: {
      background: {
        main: "#F4978E",
        default: "#F4978E",
        dark: "#F08080",
        light: '#FFFFFF',
      },
      primary: {
        main: "#FBC4AB",
      },
      secondary: {
        main: "#FBC4AB",
        dark: "#FFDAB9",
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
        main: "#000000",
        primary: "#000000", 
        secondary: "#626365",
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