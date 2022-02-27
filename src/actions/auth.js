import createAction from '@reduxjs/toolkit';

export const login = createAction('login', ({ username, password, rememberMe }) => ({
  payload: {
    request: {
      url: '/auth/login',
      mehtod: 'POST',
      data: {
        username,
        password,
        rememberMe,
      },
    },
  },
}));
