import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import reset from './css/constants/reset';

import store from './store';
import history from './utils/history';
import BasicLayout from './pages/layout';

const GlobalStyle = createGlobalStyle`${reset}`;

const App = () => (
    <Fragment>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <BasicLayout />
            </BrowserRouter>
        </Provider>
        <GlobalStyle />
    </Fragment>
);

export default App;
