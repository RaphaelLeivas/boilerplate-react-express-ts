import { createTheme } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fc6b03',
      dark: '#333333',
    },
    secondary: {
      main: '#03fcf4',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#35ff00',
      dark: green.A200,
    },
    text: {
      primary: '#ffffff',
      secondary: '#000000',
    },
    background: {
      default: '#222222',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    allVariants: {
      color: '#ffffff',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333333',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#ffffff',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        stickyHeader: {
          backgroundColor: '#222222',
        },
        root: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#222222',
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 0,
          paddingRight: 0,
          '&:last-child': {
            textAlign: 'center',
          },
        },
        root: {
          padding: 16,
          '&:last-child': {
            textAlign: 'center',
          },
          borderBottom: '1px solid #555555',
          backgroundColor: '#222222 !important',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        textColorInherit: {
          '&$selected': {
            color: '#fc6b03',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#fc6b03',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#fc6b03',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#fc6b03',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  },
});

export default theme;
