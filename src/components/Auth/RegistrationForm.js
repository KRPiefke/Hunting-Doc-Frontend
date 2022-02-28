import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/system';
import {
    Checkbox,
    Typography,
    FormControlLabel,
    FormGroup,
    Button,
    TextField,
    Dialog,
    Avatar,
    Link,
    Grid,
    Box,
    useMediaQuery,
    DialogContent,
    CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const initialFormData = {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    email: null,
};

const RegistrationForm = ({ open, handleClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const loginRequestPending = useSelector(state => state.requests.mutations.REGISTRATION?.pending);
    const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, updateFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <Dialog fullScreen={true} open={open}>
            <DialogContent>
                <Box
                    sx={{
                        display: { sm: 'flex' },
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registrierung
                        </Typography>
                    </Box>
                    <form onSubmit={loginRequestPending ? null : handleSubmit}>
                        <FormGroup sx={{ width: showFullScreen ? '100%' : '28em' }}>
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="Vorname"
                                name="firstName"
                                autoComplete="given-name"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Nachname"
                                name="lastName"
                                autoComplete="family-name"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Nutzername"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-Mail Adresse"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Passwort"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Passwort wiederholen"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" onChange={() => setShowPassword(!showPassword)} />}
                                label="Passwort anzeigen"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1.5 }}>
                                {loginRequestPending ? <CircularProgress color="secondary" size="1.75em" /> : 'Registrieren'}
                            </Button>
                            <Button fullWidth variant="outlined" onClick={handleClose} sx={{ mb: 2 }}>
                                Abbrechen
                            </Button>
                        </FormGroup>
                    </form>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://huntingdoc.kaiserreich.cloud">
                        Hunting Doc
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationForm;
