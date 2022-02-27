import { createReducer } from '@reduxjs/toolkit';
import { success, error } from '@redux-requests/core';
import tokenService from '../services/tokenService';
import { login } from '../actions/auth';

export default createReducer(
    {
        isLoggedIn: false,
        error: null,
    },
    {
        [success(login)]: (state, action) => {
            let accessToken = action.payload.data.accessToken;
            state.isLoggedIn = true;
            tokenService.setAccessToken(accessToken);
        },
        [error(login)]: (state, action) => {
            state.error = action.payload.response.data.message;
        },
    }
);
