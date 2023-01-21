import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';

import { MainAppBar } from '../components';
import { DRAWER_WIDTH } from '../theme';
import { AppRoutes } from '../navigation';
import { MainContext } from '../@types';

const MainContent = styled('main')<{
  open?: boolean;
}>(({ theme, open }) => ({
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
}));

const Main = () => {
  const { isDrawerOpen } = useContext(MainContext);

  return (
    <>
      <MainAppBar />
      <MainContent open={isDrawerOpen}>
        <AppRoutes />
      </MainContent>
    </>
  );
};

export default Main;
