import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from '@mui/material';

type Props = {
  open: boolean;
  onSave: (formName: string) => void;
  onClose: () => void;
};

const FormConfigDialog: React.FC<Props> = ({ open, onSave, onClose }) => {
  const [formName, setFormName] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Form</DialogTitle>
      <DialogContent>
        <TextField
          label="Form Name"
          value={formName}
          onChange={e => setFormName(e.target.value)}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(formName)} disabled={!formName}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormConfigDialog;
