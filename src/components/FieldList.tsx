import React from 'react';
import { FormField } from '../store/types';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = {
  fields: FormField[];
  onDelete: (id: string) => void;
  onReorder: (from: number, to: number) => void;
};

const FieldList: React.FC<Props> = ({ fields, onDelete, onReorder }) => (
  <List>
    {fields.map((field, idx) => (
      <ListItem key={field.id}>
        <ListItemText
          primary={`${field.label} (${field.type}${field.derived ? ', derived' : ''})`}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onDelete(field.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton disabled={idx === 0} onClick={() => onReorder(idx, idx - 1)}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton disabled={idx === fields.length - 1} onClick={() => onReorder(idx, idx + 1)}>
            <ArrowDownwardIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default FieldList;
