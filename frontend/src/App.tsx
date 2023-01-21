import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

import { Theme } from '@mui/material/styles';

import { PrivateRoute } from './navigation';
import { Main, Login } from './pages';
import { MainContext, DEFAULT_SNACKBAR_OPTIONS, SnackbarOptions } from './@types';
import { CustomSnackbar } from './components';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [snackbar, setSnackbar] = useState<SnackbarOptions>(DEFAULT_SNACKBAR_OPTIONS);

  return (
    <>
      <MainContext.Provider
        value={{
          isDrawerOpen: isDrawerOpen,
          setIsDrawerOpen: setIsDrawerOpen,
          snackbar: snackbar,
          setSnackbar: setSnackbar,
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
    </>
  );
}

export default App;
