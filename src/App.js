import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Container, Avatar } from '@mui/material';
import { Box } from '@mui/system';

import LoginForm from './components/Auth/LoginForm';

const App = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            setLoginDialogOpen(false);
        }
    }, [isLoggedIn]);

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                Hunting Doc
                            </Typography>
                        </Box>
                        {isLoggedIn ? (
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>AA</Avatar>
                        ) : (
                            <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                    <LoginForm open={loginDialogOpen} handleClose={() => setLoginDialogOpen(false)} />
                </Container>
            </AppBar>
        </>
    );
};

export default App;
