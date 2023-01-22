import React from 'react';
import { PaletteMode } from '@mui/material';

export type ThemeModes = PaletteMode;
export type SnackbarTypes = 'success' | 'error' | 'warning' | 'info';

export type SnackbarOptions = {
  open: boolean;
  message: string;
  type: SnackbarTypes;
  duration?: number;
};

export const DEFAULT_SNACKBAR_OPTIONS = {
  open: false,
  message: '',
  type: 'success' as SnackbarTypes,
  duration: 2500,
};

export interface IMainContext {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;

  snackbar: SnackbarOptions;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarOptions>>;

  mode: ThemeModes;
  setMode: React.Dispatch<React.SetStateAction<ThemeModes>>;
}

export const MainContext = React.createContext<IMainContext>({} as IMainContext);
