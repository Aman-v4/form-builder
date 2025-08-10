import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/create')} disabled={location.pathname === '/create'}>
          Create
        </Button>
        <Button color="inherit" onClick={() => navigate('/myforms')} disabled={location.pathname.startsWith('/myforms')}>
          My Forms
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md" style={{ paddingTop: 20 }}>
        <AppRoutes />
      </Container>
    </Provider>
  );
}

export default App;
