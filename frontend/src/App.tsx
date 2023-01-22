import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router';

import { Theme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PrivateRoute } from './navigation';
import { Main, Login } from './pages';
import { MainContext, DEFAULT_SNACKBAR_OPTIONS, SnackbarOptions, ThemeModes } from './@types';
import { CustomSnackbar } from './components';
import { getTheme, IS_MOBILE_THRESHOLD_IN_PIXELS } from './theme';
import { SettingsService } from './services';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

function App() {
  const isMobile = useMediaQuery(`(max-width:${IS_MOBILE_THRESHOLD_IN_PIXELS}px)`);

  const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);
  const [snackbar, setSnackbar] = useState<SnackbarOptions>(DEFAULT_SNACKBAR_OPTIONS);
  const [themeMode, setThemeMode] = React.useState<ThemeModes>(SettingsService.getThemeMode());

  const theme = useMemo(() => {
    SettingsService.setThemeMode(themeMode);
    return createTheme(getTheme(themeMode));
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainContext.Provider
        value={{
          isDrawerOpen,
          setIsDrawerOpen,
          snackbar,
          setSnackbar,
          themeMode,
          setThemeMode,
          isMobile,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PrivateRoute element={<Main />} />} />
        </Routes>
      </MainContext.Provider>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
      />
    </ThemeProvider>
  );
}

export default App;
