import React, { useEffect, useState } from 'react';
import { getFormsFromStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FormSchema } from '../store/types';

function MyForms() {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(getFormsFromStorage());
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Forms</Typography>
      <List>
        {forms.map(form => (
          <ListItem key={form.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/preview/${form.id}`)}>
              <ListItemText
                primary={form.name}
                secondary={new Date(form.createdAt).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MyForms;
