import React, { useState } from 'react';
import {
  Container, Typography, Button, Box, MenuItem, Select, TextField
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormField, ValidationRule } from '../store/types';
import FieldList from '../components/FieldList';
import ValidationConfig from '../components/ValidationConfig';
import DerivedConfig from '../components/DerivedConfig';
import FormConfigDialog from '../components/FormConfigDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addField, updateField, deleteField, reorderFields,
  clearCurrentForm
} from '../store/formBuilderSlice';
import { saveFormToStorage } from '../utils/localStorage';

const defaultField = (): FormField => ({
  id: uuidv4(),
  type: 'text',
  label: '',
  required: false,
  defaultValue: '',
  validations: [],
});

const fieldTypes = [
  'text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date', 'derived'
];

function CreateForm() {
  const dispatch = useDispatch();
  const { currentForm } = useSelector((state: RootState) => state.formBuilder);
  const [showDialog, setShowDialog] = useState(false);

  const [newField, setNewField] = useState<FormField>(defaultField());
  const [options, setOptions] = useState<string>('');
  const [parentFieldId, setParentFieldId] = useState('');
  const [formula, setFormula] = useState('');

  const handleAddField = () => {
    const field: FormField = {
      ...newField,
      id: uuidv4(),
      options:
        ['select', 'radio', 'checkbox'].includes(newField.type)
          ? options.split(',').map(opt => opt.trim())
          : undefined,
      derived: newField.type === 'derived'
        ? { parentIds: [parentFieldId], formula }
        : undefined,
    };
    dispatch(addField(field));
    setNewField(defaultField());
    setOptions('');
    setParentFieldId('');
    setFormula('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Form</Typography>
      <Box mb={2}>
        <Select
          value={newField.type}
          onChange={e => setNewField({ ...newField, type: e.target.value as any })}
          fullWidth
        >
          {fieldTypes.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Label"
          value={newField.label}
          onChange={e => setNewField({ ...newField, label: e.target.value })}
          fullWidth
          margin="normal"
        />
        <ValidationConfig
          validations={newField.validations || []}
          setValidations={val => setNewField({ ...newField, validations: val })}
          type={newField.type}
        />
        {['select', 'radio', 'checkbox'].includes(newField.type) && (
          <TextField
            label="Options (comma separated)"
            value={options}
            onChange={e => setOptions(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
        {newField.type === 'derived' && (
          <DerivedConfig
            allFields={currentForm.fields}
            parentFieldId={parentFieldId}
            setParentFieldId={setParentFieldId}
            formula={formula}
            setFormula={setFormula}
          />
        )}
        <Button onClick={handleAddField} variant="contained" fullWidth>Add Field</Button>
      </Box>
      <FieldList
        fields={currentForm.fields}
        onDelete={id => dispatch(deleteField(id))}
        onReorder={(from, to) => {
          if (from < 0 || to < 0 || to >= currentForm.fields.length) return;
          const updated = [...currentForm.fields];
          const [removed] = updated.splice(from, 1);
          updated.splice(to, 0, removed);
          dispatch(reorderFields(updated));
        }}
      />
      <Button variant="contained" color="secondary" onClick={() => setShowDialog(true)} fullWidth disabled={currentForm.fields.length === 0}>Save Form</Button>
      <FormConfigDialog
        open={showDialog}
        onSave={formName => {
          const newForm = {
            ...currentForm,
            id: uuidv4(),
            name: formName,
            createdAt: new Date().toISOString(),
          };
          saveFormToStorage(newForm);
          dispatch(clearCurrentForm());
          setShowDialog(false);
        }}
        onClose={() => setShowDialog(false)}
      />
    </Container>
  );
}

export default CreateForm;
