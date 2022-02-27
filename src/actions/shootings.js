import { createAction } from '@reduxjs/toolkit';

export const fetchAllShootings = createAction('FETCH_ALL_SCHOOTINGS', () => ({
    payload: {
        request: {
            url: '/shooting/data/all',
            method: 'GET',
        },
    },
}));
