import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { SnackbarTypes, DEFAULT_SNACKBAR_OPTIONS } from '../@types';

interface CustomSnackbarProps {
  type: SnackbarTypes;
  message: string;
  open: boolean;
  duration?: number;
  handleClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CustomSnackbar = ({
  type,
  message,
  open,
  duration = DEFAULT_SNACKBAR_OPTIONS.duration,
  handleClose,
}: CustomSnackbarProps) => (
  <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
    <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
