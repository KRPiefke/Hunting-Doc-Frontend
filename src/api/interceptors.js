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

// interceptor to refresh the access token if it is expired
axiosInstance.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;
        // check if the token is expired
        if (originalConfig.url !== '/auth/login' && err.response.data.message == 'access token is expired') {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const refreshResponse = await instance.post('/auth/refresh-token');
                    const { accessToken } = refreshResponse.data;
                    tokenService.setAccessToken(accessToken);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
