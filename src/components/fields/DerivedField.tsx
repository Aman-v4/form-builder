import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: string | number;
};

const DerivedField: React.FC<Props> = ({ label, value }) => (
  <TextField
    label={label}
    value={value}
    InputProps={{ readOnly: true }}
    fullWidth
    margin="normal"
  />
);

export default DerivedField;
