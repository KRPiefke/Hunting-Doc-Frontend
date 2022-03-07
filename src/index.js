import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MyThemeProvider from './theme';
import store from './store';
import getPages from './components/Pages';

const buildRouteTree = pages =>
    pages.map(({ id, path, component, children }) =>
        children ? (
            <Route key={id} path={path} element={component}>
                {buildRouteTree(children)}
            </Route>
        ) : (
            <Route key={id} path={path} element={component} />
        )
    );

ReactDOM.render(
    <Provider store={store}>
        <MyThemeProvider>
            <BrowserRouter>
                <Routes>{buildRouteTree(getPages())}</Routes>
            </BrowserRouter>
        </MyThemeProvider>
    </Provider>,
    document.getElementById('root')
);
