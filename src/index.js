import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MyThemeProvider from './theme';
import store from './store';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <MyThemeProvider>
            <App />
        </MyThemeProvider>
    </Provider>,
    document.getElementById('root')
);
