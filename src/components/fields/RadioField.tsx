import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  error?: string | null;
};

const RadioField: React.FC<Props> = ({ label, required, value, options, onChange, error }) => (
  <FormControl component="fieldset" error={!!error} margin="normal">
    <FormLabel required={required}>{label}</FormLabel>
    <RadioGroup value={value || ''} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
      ))}
    </RadioGroup>
    <FormHelperText>{error}</FormHelperText>
  </FormControl>
);

export default RadioField;
