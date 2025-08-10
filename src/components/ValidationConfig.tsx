import React from 'react';
import { FormField, ValidationRule } from '../store/types';
import { FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

type Props = {
  validations: ValidationRule[];
  setValidations: (val: ValidationRule[]) => void;
  type: string;
};

const ValidationConfig: React.FC<Props> = ({ validations, setValidations, type }) => {
  const get = (t: string) => validations.find(v => v.type === t);
  const toggle = (t: string) => {
    if (get(t)) setValidations(validations.filter(v => v.type !== t));
    else setValidations([...validations, { type: t } as ValidationRule]);
  };
  const setNumber = (t: 'minLength' | 'maxLength', val: number) => {
    setValidations([
      ...validations.filter(v => v.type !== t),
      { type: t, value: val }
    ]);
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={!!get('required')} onChange={() => toggle('required')} />}
        label="Required"
      />
      {(type === 'text' || type === 'textarea' || type === 'password') && (
        <>
          <TextField
            label="Min Length"
            type="number"
            value={get('minLength')?.value || ''}
            onChange={e => setNumber('minLength', Number(e.target.value))}
            margin="dense"
          />
          <TextField
            label="Max Length"
            type="number"
            value={get('maxLength')?.value || ''}
            onChange={e => setNumber('maxLength', Number(e.target.value))}
            margin="dense"
          />
        </>
      )}
      {type === 'text' && (
        <FormControlLabel
          control={<Checkbox checked={!!get('email')} onChange={() => toggle('email')} />}
          label="Email"
        />
      )}
      {type === 'text' && (
        <FormControlLabel
          control={<Checkbox checked={!!get('passwordRule')} onChange={() => toggle('passwordRule')} />}
          label="Password Rule"
        />
      )}
    </FormGroup>
  );
};

export default ValidationConfig;
