import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Root from './Root';
import configureStore from './store';

const preloadedState = window.__PRELOADED_STATE__ || {}
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState);

ReactDOM.hydrate(
    <BrowserRouter>
        <Root store={store} />
    </BrowserRouter>,
    document.getElementById('root')
);