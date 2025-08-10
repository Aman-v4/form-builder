import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormField } from '../store/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { saveFormToStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const fieldTypes = [
  'text',
  'number',
  'textarea',
  'select',
  'radio',
  'checkbox',
  'date',
  'derived',
];

function CreateForm() {
  const [fields, setFields] = useState<FormField[]>([]);

  const [newFieldType, setNewFieldType] = useState<FormField['type']>('text');
  const [label, setLabel] = useState('');
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState('');
  const [parentFieldId, setParentFieldId] = useState('');
  const [formula, setFormula] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [formName, setFormName] = useState('');
  const navigate = useNavigate();

  const resetNewFieldInputs = () => {
    setLabel('');
    setRequired(false);
    setOptions('');
    setParentFieldId('');
    setFormula('');
    setEditingId(null);
    setNewFieldType('text');
  };

  const fillFieldsForEdit = (field: FormField) => {
    setEditingId(field.id);
    setNewFieldType(field.type);
    setLabel(field.label);
    setRequired(field.required);
    setOptions(field.options ? field.options.join(', ') : '');
    if (field.derived) {
      setParentFieldId(field.derived.parentIds[0]);
      setFormula(field.derived.formula);
    } else {
      setParentFieldId('');
      setFormula('');
    }
  };

  const addOrUpdateField = () => {
    if (!label.trim()) {
      alert('Please enter label for the field.');
      return;
    }
    if (
      ['select', 'radio', 'checkbox'].includes(newFieldType) &&
      !options.trim()
    ) {
      alert(`Please enter options for the ${newFieldType} field (comma separated).`);
      return;
    }
    if (newFieldType === 'derived' && (!parentFieldId || !formula)) {
      alert('Please select parent field and formula for derived field.');
      return;
    }

    const fieldData: FormField = {
      id: editingId || uuidv4(),
      type: newFieldType,
      label,
      required,
    };

    if (['select', 'radio', 'checkbox'].includes(newFieldType)) {
      fieldData.options = options.split(',').map(opt => opt.trim());
    }
    if (newFieldType === 'derived') {
      fieldData.derived = { parentIds: [parentFieldId], formula };
    }

    if (editingId) {
      setFields(fields.map(f => (f.id === editingId ? fieldData : f)));
    } else {
      setFields([...fields, fieldData]);
    }
    resetNewFieldInputs();
  };

  const deleteField = (id: string) => {
    if (editingId === id) {
      resetNewFieldInputs(); 
    }
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert('Please enter form name.');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field to save.');
      return;
    }
    const form = {
      id: uuidv4(),
      name: formName,
      createdAt: new Date().toISOString(),
      fields,
    };
    saveFormToStorage(form);
    alert('Form saved!');
    setFields([]);
    setFormName('');
    setShowSaveDialog(false);
    resetNewFieldInputs();

    navigate('/myforms');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Form
      </Typography>

      <Box mb={3}>
        <Select
          value={newFieldType}
          onChange={e => setNewFieldType(e.target.value as FormField['type'])}
          fullWidth
          size="small"
        >
          {fieldTypes.map(ft => (
            <MenuItem key={ft} value={ft}>
              {ft}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Field Label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={required}
              onChange={e => setRequired(e.target.checked)}
              color="primary"
            />
          }
          label="Required"
        />

        {['select', 'radio', 'checkbox'].includes(newFieldType) && (
          <TextField
            label="Options (comma separated)"
            value={options}
            onChange={e => setOptions(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
          />
        )}

        {newFieldType === 'derived' && (
          <>
            <TextField
              label="Parent Field ID"
              value={parentFieldId}
              onChange={e => setParentFieldId(e.target.value)}
              fullWidth
              size="small"
              margin="normal"
              helperText="Enter ID of parent field"
            />
            <TextField
              label="Formula"
              value={formula}
              onChange={e => setFormula(e.target.value)}
              fullWidth
              size="small"
              margin="normal"
              helperText="e.g. ageFromDOB"
            />
          </>
        )}

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={addOrUpdateField}>
            {editingId ? 'Update Field' : 'Add Field'}
          </Button>
          {editingId && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={resetNewFieldInputs}
              sx={{ ml: 2 }}
            >
              Cancel Edit
            </Button>
          )}
        </Box>
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Current Fields</Typography>
        {fields.length === 0 && <Typography>No fields added yet.</Typography>}
        {fields.map((field, idx) => (
          <Box
            key={field.id}
            p={1}
            border="1px solid #ddd"
            borderRadius={1}
            mb={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>
              {idx + 1}. {field.label} — {field.type}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                aria-label="edit field"
                onClick={() => fillFieldsForEdit(field)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                aria-label="delete field"
                onClick={() => deleteField(field.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowSaveDialog(true)}
        disabled={fields.length === 0}
      >
        Save Form
      </Button>

      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            label="Form Name"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveForm} disabled={!formName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateForm;
