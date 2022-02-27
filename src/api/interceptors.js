import axiosInstance from './instance';
import tokenService from './instance';

// interceptor to add the access token in header on every request
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = tokenService.getAccessToken();
        if (token) {
            config.headers['x-access-token'] = accessToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
