import React, { useContext } from 'react';
import { useTheme } from '@mui/styles';

import { MainAppBar, MainContent } from '../components';
import { AppRoutes } from '../navigation';
import { MainContext } from '../@types';

const Main = () => {
  const { isDrawerOpen, isMobile } = useContext(MainContext);
  const theme = useTheme();

  return (
    <>
      <MainAppBar />
      {/* precisa passar manualmente as props para o MainComponent pois ele esta memoizado
      assim evita re-renderizar todos os componentes do AppRoutes quando nao precisa */}
      <MainContent open={isDrawerOpen} isMobile={isMobile} theme={theme}>
        <AppRoutes />
      </MainContent>
    </>
  );
};

export default Main;
