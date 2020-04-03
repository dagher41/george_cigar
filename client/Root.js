import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import AppContainer from './modules/app/AppContainer';

export default class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={this.props.store} >
                <Route path="/" component={AppContainer} />
            </Provider >
        );
    }
}
