import { createReducer } from '@reduxjs/toolkit';
import { success, error } from '@redux-requests/core';
import { fetchAllShootings } from '../actions/shootings';

export default createReducer(
    {
        data: null,
        error: null,
    },
    {
        [success(fetchAllShootings)]: (state, action) => {
            state.data = action.payload.data;
        },
        [error(fetchAllShootings)]: (state, action) => {
            console.log(action.payload.response.data);
            state.error = action.payload.response.data.message;
        },
    }
);
