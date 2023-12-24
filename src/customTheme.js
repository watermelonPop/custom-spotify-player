import { createTheme, responsiveFontSizes } from '@mui/material';
import '@fontsource/montserrat';

const theme = responsiveFontSizes(
  createTheme({
    name: "custom-theme",
    spacing: 4,
    typography: {
        fontFamily: 'Montserrat',
        borderRadius: "0rem",
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Montserrat',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Montserrat',
        fontStyle: 'bold',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Montserrat',
        textAlign: 'left',
        fontWeight: "bold",
      },
      h4: {
        fontSize: '1.5rem',
        fontFamily: 'Montserrat',
        textAlign: 'left',
        fontWeight: "bold",
      },
      body1: {
        fontSize: '1.3rem',
        fontFamily: 'Montserrat',
        textAlign: 'justify',
        fontWeight: "bold",
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Montserrat',
        textAlign: 'justify',
        fontWeight: "bold",
      }
    },
    palette: {
      background: {
        main: '#121212',
        default: '#121212',
        dark: '#000000',
        light: '#FFFFFF',
      },
      primary: {
        main: '#1FB954',
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
        main: '#FFFFFF', 
        primary: '#FFFFFF', 
        secondary: '#9FA0A1', 
      },
      transitions: {
        create: () => 'all 0.3s ease', // Add your desired transition here
      },
    },
  })
);

export default theme;