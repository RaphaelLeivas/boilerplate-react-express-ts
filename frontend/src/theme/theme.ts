import { grey, red, green, cyan } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';
import { ThemeModes } from '../@types';

const lightThemeColor = cyan
const darkThemeColor = grey

const getTheme = (mode: ThemeModes): ThemeOptions => ({
  palette: {
    mode,
    error: red,
    success: green,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: lightThemeColor,
          divider: lightThemeColor[200],
          background: {
            default: grey[200],
            paper: lightThemeColor[100],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: darkThemeColor,
          divider: darkThemeColor[700],
          background: {
            default: darkThemeColor[900],
            paper: darkThemeColor[900],
          },
          text: {
            primary: grey[50],
            secondary: grey[500],
          },
        }),
  },
  typography: {
    allVariants: {
      fontFamily: 'Arial',
      textTransform: 'none',
      fontSize: 14,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? lightThemeColor[800] : darkThemeColor[50],
        },
      },
    },
  },
});

export default getTheme;
