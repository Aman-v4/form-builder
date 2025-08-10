import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
};

const TextField: React.FC<Props> = ({ label, required, value, onChange, error }) => (
  <MuiTextField
    label={label}
    required={required}
    value={value}
    onChange={e => onChange(e.target.value)}
    error={!!error}
    helperText={error}
    fullWidth
    margin="normal"
  />
);

export default TextField;
