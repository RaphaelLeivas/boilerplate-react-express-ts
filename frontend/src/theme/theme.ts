import { createTheme } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    allVariants: {
      fontFamily: 'Arial',
      textTransform: 'none',
      fontSize: 14,
    },
  },
  // components: {
  //   MuiSvgIcon: {
  //     styleOverrides: {
  //       root: {
  //         color: '#fc6b03',
  //       },
  //     },
  //   },
  // },
});

export default theme;
