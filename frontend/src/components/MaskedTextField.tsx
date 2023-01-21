// @ts-nocheck
import React from 'react';
import InputMask from 'react-input-mask';

import TextField, { TextFieldProps } from '@mui/material/TextField';

type MaskedTextFieldProps = TextFieldProps & { mask: string };

const MaskedTextField = ({ mask, value, onChange, ...props }: MaskedTextFieldProps) => (
  <InputMask
    mask={mask}
    value={value as string}
    onChange={onChange}
    alwaysShowMask={false}
    maskChar={null}
  >
    {() => <TextField {...props} value={value} />}
  </InputMask>
);

export default MaskedTextField;
