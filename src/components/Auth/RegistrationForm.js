import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registration, clearRegistrationState } from '../../actions/auth';
import validateFormData from '../../utils/validations';
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
    Box,
    useMediaQuery,
    DialogContent,
    CircularProgress,
    Alert,
    AlertTitle,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegistrationForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registrationRequestPending = useSelector(state => state.requests.mutations?.REGISTRATION?.pending);
    const registrationState = useSelector(state => state.auth.registration);
    const isAdmin = useSelector(state => state.auth?.user?.scopes?.isAdmin);
    const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({});
    const [formDataError, setFormDataError] = useState({});
    const [formDataApiError, setFormDataApiError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const validate = () => {
        let validation = validateFormData(formData);
        setFormDataError(validation);
        return !validation.hasError;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            dispatch(registration(formData));
        }
    };

    const clearStatesAndClose = useCallback(() => {
        dispatch(clearRegistrationState());
        setFormData({});
        setFormDataError({});
        setFormDataApiError({});
        navigate('/');
    }, [dispatch, setFormData, setFormDataError, setFormDataApiError, navigate]);

    useEffect(() => {
        if (registrationState.success) {
            clearStatesAndClose();
        }
        if (registrationState.error === 'An User with this Email already exists.') {
            setFormDataApiError(prevState => {
                return { ...prevState, email: 'Es existiert bereits ein Nutzer mit dieser E-mail.' };
            });
        } else {
            setFormDataApiError(prevState => {
                return { ...prevState, email: null };
            });
        }
        if (registrationState.error === 'An User with this Username already exists.') {
            setFormDataApiError(prevState => {
                return {
                    ...prevState,
                    username: 'Der Nutzername ist bereits vergeben.',
                };
            });
        } else {
            setFormDataApiError(prevState => {
                return { ...prevState, username: null };
            });
        }
    }, [registrationState, dispatch, clearStatesAndClose]);

    return (
        <Dialog fullScreen={true} open={true}>
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
                    <form onSubmit={registrationRequestPending ? null : handleSubmit}>
                        <FormGroup sx={{ width: showFullScreen ? '100%' : '28em' }}>
                            <TextField
                                error={formDataError?.firstName ? true : false}
                                helperText={formDataError?.firstName}
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
                                error={formDataError?.lastName ? true : false}
                                helperText={formDataError?.lastName}
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
                                error={formDataError?.username || formDataApiError?.username ? true : false}
                                helperText={formDataError?.username || formDataApiError?.username}
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
                                error={formDataError?.email || formDataApiError?.email ? true : false}
                                helperText={formDataError?.email || formDataApiError?.email}
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
                            <Alert severity="info">
                                <AlertTitle>Passwort Kriterien</AlertTitle>
                                - zwischen 8 und 32 Zeichen lang
                                <br />
                                - mindestens einen Kleinbuchstaben
                                <br />
                                - mindestens einen Großbuchstaben
                                <br />
                                - mindestens eine Zahl
                                <br />- mindestens ein Sonderzeichen
                            </Alert>
                            <TextField
                                error={formDataError?.password ? true : false}
                                helperText={formDataError?.password}
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
                                error={formDataError?.repeatedPassword ? true : false}
                                helperText={formDataError?.repeatedPassword}
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="repeatedPassword"
                                label="Passwort wiederholen"
                                type="password"
                                id="repeatedPassword"
                                autoComplete="new-password"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" onChange={() => setShowPassword(!showPassword)} />}
                                label="Passwort anzeigen"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1.5 }}>
                                {registrationRequestPending ? (
                                    <CircularProgress color="secondary" size="1.75em" />
                                ) : (
                                    'Registrieren'
                                )}
                            </Button>
                            <Button fullWidth variant="outlined" onClick={clearStatesAndClose} sx={{ mb: 2 }}>
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
