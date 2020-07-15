import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import store from './store';
import App from './App';
import 'antd/dist/antd.css';
import reset from './constants/css/reset';

import history from './utils/history';

const GlobalStyle = createGlobalStyle`${reset}`;

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>
      <GlobalStyle />
    </Fragment>
  </BrowserRouter>,
  document.getElementById('root')
);
