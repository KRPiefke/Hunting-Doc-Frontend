import { createReducer } from '@reduxjs/toolkit';
import { success, error } from '@redux-requests/core';
import axiosInstance from '../api/instance';
import { login } from '../actions/auth';

export default createReducer(
    {
        accessToken: null,
        isLoggedIn: false,
        error: null,
    },
    {
        [success(login)]: (state, action) => {
            let accessToken = action.payload.data.access_token;
            state.accessToken = accessToken;
            state.isLoggedIn = true;
            axiosInstance.defaults.headers.authorization = 'Bearer ' + accessToken;
        },
        [error(login)]: (state, action) => {
            console.log(action.payload.response.data);
            state.error = action.payload.response.data.message;
        },
    }
);
