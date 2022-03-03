import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

const Alerts = () => {
    const registrationState = useSelector(state => state.auth.registration);
    const [registrationError, setRegistrationError] = useState(false);

    const handleCloseRegistrationError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRegistrationError(false);
    };

    useEffect(() => {
        if (
            registrationState.error !== 'An User with this Email already exists.' ||
            registrationState.error !== 'An User with this Username already exists.'
        ) {
            setRegistrationError(true);
        }
    }, [registrationState]);

    return (
        <Snackbar open={registrationError} autoHideDuration={6000} onClose={handleCloseRegistrationError}>
            <Alert onClose={handleCloseRegistrationError} severity="error" sx={{ width: '100%' }}>
                Bei der Registrierung ist ein Fehler aufgetreten!
            </Alert>
        </Snackbar>
    );
};

export default Alerts;
