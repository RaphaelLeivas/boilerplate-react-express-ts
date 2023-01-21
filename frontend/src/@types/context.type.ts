import React from 'react';

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
}

export const MainContext = React.createContext<IMainContext>({} as IMainContext);
