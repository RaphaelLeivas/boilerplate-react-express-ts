import React from 'react';
import { DefaultTheme } from '@mui/styles';
import Box from '@mui/material/Box';

import { DRAWER_WIDTH } from '../theme';

interface IMainContent {
  children: React.ReactNode;
  open: boolean;
  isMobile: boolean;
  theme: DefaultTheme;
}

const MainContent = ({ children, open, isMobile, theme }: IMainContent) => (
  <Box
    component="main"
    sx={
      isMobile
        ? {
            flexGrow: 1,
            padding: theme.spacing(2),
          }
        : {
            flexGrow: 1,
            padding: theme.spacing(2),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `${DRAWER_WIDTH}px`,
            ...(!open && {
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginLeft: 0,
            }),
          }
    }
  >
    {children}
  </Box>
);

export default React.memo(MainContent);
