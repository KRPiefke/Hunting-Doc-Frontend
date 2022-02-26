import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/system';

import LoginForm from './components/Auth/LoginForm';

const App = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <div>
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
          <LoginForm open={loginDialogOpen} handleClose={() => setLoginDialogOpen(false)} />
        </Container>
      </AppBar>
    </div>
  );
};

export default App;
