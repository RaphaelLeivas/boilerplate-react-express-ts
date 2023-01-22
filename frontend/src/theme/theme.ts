import { amber, deepOrange, grey } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';
import { ThemeModes } from '../@types'

const getTheme = (mode: ThemeModes): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: amber,
        divider: amber[200],
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      }
      : {
        // palette values for dark mode
        primary: deepOrange,
        divider: deepOrange[700],
        background: {
          default: deepOrange[900],
          paper: deepOrange[900],
        },
        text: {
          primary: '#fff',
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
          color: '#fc6b03',
        },
      },
    },
  },
});

export default getTheme;
