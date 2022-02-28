import { createReducer } from '@reduxjs/toolkit';
import { success, error } from '@redux-requests/core';
import tokenService from '../services/tokenService';
import { login, refreshToken, logout, register } from '../actions/auth';

export default createReducer(
    {
        isLoggedIn: false,
        error: null,
        user: null,
        registration: {
            error: null,
            success: null,
        },
    },
    {
        [success(login)]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.data.user;
            tokenService.setAccessToken(action.payload.data.accessToken);
        },
        [error(login)]: (state, action) => {
            state.error = action.payload.response.data.message;
        },
        [success(refreshToken)]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.data.user;
            tokenService.setAccessToken(action.payload.data.accessToken);
        },
        [success(logout)]: (state, action) => {
            state.isLoggedIn = false;
            tokenService.setAccessToken(null);
            window.location.reload();
        },
        [success(register)]: (state, action) => {
            state.registration.success = true;
        },
        [error(register)]: (state, action) => {
            state.registration.error = action.payload.response.data.message;
        },
    }
);
