import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MyThemeProvider from './theme';
import store from './store';
import getPages from './components/Pages';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <MyThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        {getPages().map(({ id, path, component }) => (
                            <Route key={id} path={path} element={component} />
                            //Rekursive funktion zum erstellen von child components mit den pfaden
                        ))}
                    </Route>
                </Routes>
            </BrowserRouter>
        </MyThemeProvider>
    </Provider>,
    document.getElementById('root')
);
