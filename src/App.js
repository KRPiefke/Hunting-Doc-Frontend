import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShootings } from './actions/shootings';
import { refreshToken, logout } from './actions/auth';
import { AppBar, Toolbar, Typography, Button, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';

import RegistrationForm from './components/Auth/RegistrationForm';
import Alerts from './components/Alerts';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
    const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(null);
    const avatarMenuOpen = Boolean(avatarMenuAnchorEl);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userInitials = useSelector(state => state.auth?.user?.initials);
    const isAdmin = useSelector(state => state.auth?.user?.scopes?.isAdmin);

    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchAllShootings());
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, dispatch, navigate]);

    const handleAvatarMenuClick = event => {
        setAvatarMenuAnchorEl(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAvatarMenuAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
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
                                {userInitials}
                            </Avatar>
                        ) : (
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        )}
                        <Menu
                            id="avatar-menu"
                            anchorEl={avatarMenuAnchorEl}
                            open={avatarMenuOpen}
                            onClose={handleAvatarMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                            {isAdmin ? (
                                <MenuItem
                                    autoFocus={false}
                                    onClick={() => {
                                        handleAvatarMenuClose();
                                        setRegistrationDialogOpen(true);
                                    }}>
                                    Registrierung
                                </MenuItem>
                            ) : null}
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
                    <RegistrationForm open={registrationDialogOpen} handleClose={() => setRegistrationDialogOpen(false)} />
                </Container>
            </AppBar>
            <Alerts />
            <Outlet />
        </>
    );
};

export default App;
