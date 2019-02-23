import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AppContainer from './AppContainer';
import configureStore from './store';

const store = configureStore({});

ReactDOM.hydrate(
    <BrowserRouter>
        <AppContainer store={store} />
    </BrowserRouter>,
    document.getElementById('root')
);