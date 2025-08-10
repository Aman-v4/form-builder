import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, FormLabel, FormHelperText } from '@mui/material';

type Props = {
  label: string;
  required: boolean;
  value: string[];
  options: string[];
  onChange: (vals: string[]) => void;
  error?: string | null;
};

const CheckboxField: React.FC<Props> = ({ label, required, value, options, onChange, error }) => {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={value.includes(option)}
                onChange={() => toggle(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </div>
  );
};

export default CheckboxField;
