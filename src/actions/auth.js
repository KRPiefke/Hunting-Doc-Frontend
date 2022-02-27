import { createAction } from '@reduxjs/toolkit';

export const login = createAction('LOGIN', ({ username, password, rememberMe }) => ({
    payload: {
        request: {
            url: '/auth/login',
            method: 'POST',
            data: {
                username,
                password,
                rememberMe,
            },
        },
    },
}));
