import { grey, red, green, cyan } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';
import { ThemeModes } from '../@types';

const lightThemeColor = cyan;
const darkThemeColor = grey;

const getTheme = (mode: ThemeModes): ThemeOptions => ({
  palette: {
    mode,
    error: red,
    success: green,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: lightThemeColor[50],
            main: lightThemeColor[500],
            dark: lightThemeColor[800],
            contrastText: grey[900],
            ...lightThemeColor
          },
          divider: lightThemeColor[200],
          background: {
            default: grey[200],
            paper: lightThemeColor[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: darkThemeColor[50],
            main: darkThemeColor[600],
            dark: darkThemeColor[800],
            contrastText: grey[50],
            ...darkThemeColor
          },
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
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? lightThemeColor[400] : darkThemeColor[600],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? grey[900] : grey[50],
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? grey[900] : grey[50],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          '&:last-child': {
            textAlign: 'center',
          },
        },
      },
    },
  },
});

export default getTheme;
