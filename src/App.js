import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShootings } from './actions/shootings';
import { refreshToken, logout } from './actions/auth';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

import LoginForm from './components/Auth/LoginForm';

const App = () => {
    const dispatch = useDispatch();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(null);
    const avatarMenuOpen = Boolean(avatarMenuAnchorEl);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            setLoginDialogOpen(false);
            dispatch(fetchAllShootings());
        }
    }, [isLoggedIn, dispatch]);

    const handleAvatarMenuClick = event => {
        setAvatarMenuAnchorEl(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAvatarMenuAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

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
                            <Avatar
                                aria-controls={avatarMenuOpen ? 'avatar-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={avatarMenuOpen ? 'true' : undefined}
                                onClick={handleAvatarMenuClick}
                                sx={{ bgcolor: 'secondary.main' }}>
                                AA
                            </Avatar>
                        ) : (
                            <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                                Login
                            </Button>
                        )}
                        <Menu
                            id="avatar-menu"
                            anchorEl={avatarMenuAnchorEl}
                            open={avatarMenuOpen}
                            onClose={handleAvatarMenuClose}>
                            <MenuItem
                                autoFocus={false}
                                onClick={() => {
                                    handleAvatarMenuClose();
                                    handleLogout();
                                }}>
                                Abmelden
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                    <LoginForm open={loginDialogOpen} handleClose={() => setLoginDialogOpen(false)} />
                </Container>
            </AppBar>
        </>
    );
};

export default App;
