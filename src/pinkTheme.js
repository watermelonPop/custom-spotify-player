import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    name: "pink-theme",
    spacing: 4,
    typography: {
      fontFamily: [
        'Cute-Love', // Add the custom font family name
      ].join(','),
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Cute-Love',
        textAlign: 'left',
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Cute-Love',
        fontStyle: 'bold',
        textAlign: 'left',
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Cute-Love',
        textAlign: 'left',
      },
      p: {
        fontSize: '1.8rem',
        fontFamily: 'Cute-Love',
        textAlign: 'justify',
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Cute-Love',
        textAlign: 'justify',
      }
    },
    palette: {
      background: {
        default: '#121212',
        dark: '#000000',
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

// Add the custom font face rule
const customFontStyle = document.createElement('style');
customFontStyle.innerHTML = `
  @font-face {
    font-family: 'Cute-Love';
    src: url('/CuteLove-8M7J0.ttf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }
`;
document.head.appendChild(customFontStyle);

export default theme;