import { createAction } from '@reduxjs/toolkit';

export const login = createAction('login', ({ username, password, rememberMe }) => ({
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
