import allReducers from './reducers';
import axiosInstance from './api/instance';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';

const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(axiosInstance),
});

const reducers = combineReducers({
    requests: requestsReducer,
    ...allReducers,
});

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(requestsMiddleware),
});

export default store;
