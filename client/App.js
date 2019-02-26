import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './modules/_common/components/Header';
import Footer from './modules/_common/components/Footer';
import HomePage from './modules/home/HomePage';
import CigarsPage from './modules/cigars/CigarsPage';
import VapesPage from './modules/vapes/VapesPage';
import GlassPage from './modules/glass/GlassPage';
import CBDPage from './modules/cbd/CBDPage';
import ContactUsPage from './modules/contact-us/ContactUsPage';
import ScrollTop from './modules/_common/components/ScrollTop';

export class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ScrollTop(HomePage)} />
                    <Route path="/cigars" component={ScrollTop(CigarsPage)} />
                    <Route path="/vapes" component={ScrollTop(VapesPage)} />
                    <Route path="/glass" component={ScrollTop(GlassPage)} />
                    <Route path="/cbd" component={ScrollTop(CBDPage)} />
                    <Route path="/contact-us" component={ScrollTop(ContactUsPage)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
