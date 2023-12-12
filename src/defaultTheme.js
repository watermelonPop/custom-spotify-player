import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    typography: {
      fontFamily: [
        'Metropolis-SemiBold', // Add the custom font family name
      ].join(','),
      h1: {
        fontSize: '5rem',
        fontFamily: 'Metropolis-SemiBold',
      },
      h2: {
        fontSize: '3.5rem',
        fontFamily: 'Metropolis-SemiBold',
        fontStyle: 'bold',
      },
      h3: {
        fontSize: '2.5rem',
        fontFamily: 'Metropolis-SemiBold',
      },
    },
    palette: {
      background: {
        default: '#121212',
        dark: 'black',
        light: 'white',
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
        primary: 'white', // black
        secondary: '#9FA0A1', // white
      },
    },
  })
);

// Add the custom font face rule
const customFontStyle = document.createElement('style');
customFontStyle.innerHTML = `
  @font-face {
    font-family: 'Metropolis-SemiBold';
    src: url('/Metropolis-SemiBold.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }
`;
document.head.appendChild(customFontStyle);

export default theme;