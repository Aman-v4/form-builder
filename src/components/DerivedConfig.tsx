import React from 'react';
import { FormField } from '../store/types';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

type Props = {
  allFields: FormField[];
  parentFieldId: string;
  setParentFieldId: (id: string) => void;
  formula: string;
  setFormula: (formula: string) => void;
};

const DerivedConfig: React.FC<Props> = ({
  allFields, parentFieldId, setParentFieldId, formula, setFormula
}) => (
  <>
    <FormControl fullWidth margin="normal">
      <InputLabel>Parent Field</InputLabel>
      <Select
        value={parentFieldId}
        label="Parent Field"
        onChange={e => setParentFieldId(e.target.value as string)}
      >
        {allFields.map(f => (
          <MenuItem key={f.id} value={f.id}>
            {f.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputLabel>Formula</InputLabel>
      <Select
        value={formula}
        label="Formula"
        onChange={e => setFormula(e.target.value as string)}
      >
        <MenuItem value="ageFromDOB">Age from Date of Birth</MenuItem>
        {/* Add more as needed */}
      </Select>
    </FormControl>
  </>
);

export default DerivedConfig;
