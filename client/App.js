import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './modules/_common/components/Header';
import HomePage from './modules/home/HomePage';
import CigarsPage from './modules/cigars/CigarsPage';
import VapesPage from './modules/vapes/VapesPage';
import GlassPage from './modules/glass/GlassPage';
import CBDPage from './modules/cbd/CBDPage';
import ContactUsPage from './modules/contact-us/ContactUsPage';

export class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/cigars" component={CigarsPage} />
                    <Route path="/vapes" component={VapesPage} />
                    <Route path="/glass" component={GlassPage} />
                    <Route path="/cbd" component={CBDPage} />
                    <Route path="/contact-us" component={ContactUsPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
