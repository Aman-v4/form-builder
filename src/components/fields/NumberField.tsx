import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: number;
  onChange: (val: number) => void;
  error?: string | null;
};

const NumberField: React.FC<Props> = ({ label, required, value, onChange, error }) => (
  <MuiTextField
    type="number"
    label={label}
    required={required}
    value={value || ''}
    onChange={e => onChange(Number(e.target.value))}
    error={!!error}
    helperText={error}
    fullWidth
    margin="normal"
  />
);

export default NumberField;
