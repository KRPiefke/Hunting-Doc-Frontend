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
      state.accessToken = action.payload.data.accessToken;
      axiosInstance.defaults.headers.authorization = action.payload.data.access_token;
    },
    [error(login)]: (state, action) => {
      state.error = action.payload.data.error;
    },
  }
);
