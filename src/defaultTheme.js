import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createTheme({
    name: "default-theme",
    spacing: 4,
    typography: {
      fontFamily: [
        'Metropolis-SemiBold', // Add the custom font family name
      ].join(','),
      h1: {
        fontSize: '3.0rem',
        fontFamily: 'Metropolis-SemiBold',
        textAlign: 'left',
      },
      h2: {
        fontSize: '2.5rem',
        fontFamily: 'Metropolis-SemiBold',
        fontStyle: 'bold',
        textAlign: 'left',
      },
      h3: {
        fontSize: '2.0rem',
        fontFamily: 'Metropolis-SemiBold',
        textAlign: 'left',
      },
      p: {
        fontSize: '1.8rem',
        fontFamily: 'Metropolis-SemiBold',
        textAlign: 'justify',
      },
      subtitle1:{
        fontSize: '1.0rem',
        fontFamily: 'Metropolis-SemiBold',
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
    font-family: 'Metropolis-SemiBold';
    src: url('/Metropolis-SemiBold.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
  }
`;
document.head.appendChild(customFontStyle);

export default theme;