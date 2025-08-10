import React, { useEffect, useState } from 'react';
import { getFormsFromStorage, saveFormToStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  Slide,
} from '@mui/material';
import { FormSchema } from '../store/types';

function MyForms() {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(getFormsFromStorage());
  }, []);

  const handleDelete = (formId: string) => {
    const updatedForms = forms.filter(f => f.id !== formId);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        My Forms
      </Typography>

      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/create')}
          sx={{
            fontWeight: 'bold',
            px: 5,
            py: 1.5,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          + Create Form
        </Button>
      </Box>

      {forms.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No forms created yet. Click "Create Form" to get started.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Form Name</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell align="center"><strong>Preview</strong></TableCell>
              <TableCell align="center"><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form, index) => (
              <Slide direction="up" in={true} style={{ transitionDelay: `${index * 100}ms` }} key={form.id}>
                <TableRow hover sx={{ cursor: 'default' }}>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{new Date(form.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate(`/preview/${form.id}`)}
                      sx={{
                        transition: 'background-color 0.3s, transform 0.2s',
                        '&:hover': {
                          backgroundColor: 'secondary.light',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      Preview
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(form.id)}
                      sx={{
                        transition: 'background-color 0.3s, transform 0.2s',
                        '&:hover': {
                          backgroundColor: 'error.light',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </Slide>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default MyForms;
