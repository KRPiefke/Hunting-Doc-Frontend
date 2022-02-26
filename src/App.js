import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/system';

const App = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Hunting Doc
            </Typography>
          </Box>
            <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
              Login
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default App;
