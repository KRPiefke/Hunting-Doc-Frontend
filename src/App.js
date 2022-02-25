import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { styled, Box } from '@mui/system';

const App = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h5">Hunting Doc</Typography>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default App;
