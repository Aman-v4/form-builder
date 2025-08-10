import React from 'react';
import { TextField, MenuItem } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  error?: string | null;
};

const SelectField: React.FC<Props> = ({ label, required, value, options, onChange, error }) => (
  <TextField
    select
    label={label}
    value={value}
    required={required}
    onChange={e => onChange(e.target.value)}
    error={!!error}
    helperText={error}
    fullWidth
    margin="normal"
  >
    {options.map(option => (
      <MenuItem key={option} value={option}>{option}</MenuItem>
    ))}
  </TextField>
);

export default SelectField;
