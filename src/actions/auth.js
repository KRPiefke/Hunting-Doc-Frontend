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

export const refreshToken = createAction('REFRESH_TOKEN', () => ({
    payload: {
        request: {
            url: '/auth/refresh-token',
            method: 'POST',
        },
    },
}));

export const logout = createAction('LOGOUT', () => ({
    payload: {
        request: {
            url: '/auth/logout',
            method: 'POST',
        },
    },
}));
