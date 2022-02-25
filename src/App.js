import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
            Hunting Doc
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default App;
