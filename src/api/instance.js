import axios from 'axios';
import tokenService from '../services/tokenService';

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// interceptor to add the access token in header on every request
apiInstance.interceptors.request.use(
    config => {
        const accessToken = tokenService.getAccessToken();
        if (accessToken) {
            config.headers['x-access-token'] = accessToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// interceptor to refresh the access token if it is expired
apiInstance.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;
        // check if the token is expired
        if (originalConfig.url !== '/auth/login' && err.response.data.message === 'jwt expired') {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const refreshResponse = await apiInstance.post('/auth/refresh-token');
                    const { accessToken } = refreshResponse.data;
                    tokenService.setAccessToken(accessToken);
                    return apiInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default apiInstance;
