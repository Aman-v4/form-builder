import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
};

const DateField: React.FC<Props> = ({ label, required, value, onChange, error }) => (
  <TextField
    type="date"
    label={label}
    required={required}
    value={value}
    onChange={e => onChange(e.target.value)}
    error={!!error}
    helperText={error}
    fullWidth
    margin="normal"
    InputLabelProps={{ shrink: true }}
  />
);

export default DateField;
