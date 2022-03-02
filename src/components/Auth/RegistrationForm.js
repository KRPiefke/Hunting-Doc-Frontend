import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearRegisterState } from '../../actions/auth';
import {
    nameValidation,
    usernameValidation,
    emailValidation,
    passwordValidation,
    repeatedPasswordValidation,
} from '../../utils/validations';
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const initialFormData = {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    email: null,
    repeatedPassword: null,
};

const RegistrationForm = ({ open, handleClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const registerRequestPending = useSelector(state => state.requests.mutations?.REGISTER?.pending);
    const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, updateFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [repeatedPasswordError, setRepeatedPasswordError] = useState(null);

    const handleChange = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const validateFormData = () => {
        let validation;
        let hasError = false;
        validation = nameValidation(formData.firstName);
        if (validation) hasError = true;
        setFirstNameError(validation);
        validation = nameValidation(formData.lastName);
        if (validation) hasError = true;
        setLastNameError(validation);
        validation = usernameValidation(formData.username);
        if (validation) hasError = true;
        setUsernameError(validation);
        validation = emailValidation(formData.email);
        if (validation) hasError = true;
        setEmailError(validation);
        validation = passwordValidation(formData.password);
        if (validation) hasError = true;
        setPasswordError(validation);
        validation = repeatedPasswordValidation(formData.password, formData.repeatedPassword);
        if (validation) hasError = true;
        setRepeatedPasswordError(validation);

        if (hasError) {
            return false;
        }
        return true;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (validateFormData()) {
            delete formData.repeatedPassword;
            dispatch(register(formData));
        }
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
                    <form onSubmit={registerRequestPending ? null : handleSubmit}>
                        <FormGroup sx={{ width: showFullScreen ? '100%' : '28em' }}>
                            <TextField
                                error={firstNameError ? true : false}
                                helperText={firstNameError ? firstNameError : null}
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
                                error={lastNameError ? true : false}
                                helperText={lastNameError ? lastNameError : null}
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
                                error={usernameError ? true : false}
                                helperText={usernameError ? usernameError : null}
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
                                error={emailError ? true : false}
                                helperText={emailError ? emailError : null}
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
                                error={passwordError ? true : false}
                                helperText={passwordError ? passwordError : null}
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
                                error={repeatedPasswordError ? true : false}
                                helperText={repeatedPasswordError ? repeatedPasswordError : null}
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="repeatedPassword"
                                label="Passwort wiederholen"
                                type={showPassword ? 'text' : 'password'}
                                id="repeatedPassword"
                                autoComplete="new-password"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" onChange={() => setShowPassword(!showPassword)} />}
                                label="Passwort anzeigen"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1.5 }}>
                                {registerRequestPending ? (
                                    <CircularProgress color="secondary" size="1.75em" />
                                ) : (
                                    'Registrieren'
                                )}
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
