import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AppContainer from './AppContainer';

ReactDOM.hydrate(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,
    document.getElementById('root')
);