import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './modules/home/HomePage';
import CigarsPage from './modules/cigars/CigarsPage';
import VapesPage from './modules/vapes/VapesPage';
import GlassPage from './modules/glass/GlassPage';
import CBDPage from './modules/cbd/CBDPage';

// import logo from './assets/images/george_cigar_logo.jpg';

export class App extends Component {
    render() {
        return (
            <div>
                <div className="position-absolute w-100 mt-4">
                    {/* <img src={logo}></img> */}
                    <ul className="nav justify-content-center">
                        <li className="nav-item"><Link to='/' className="nav-link text-white mx-3">Home</Link></li>
                        <li className="nav-item"><Link to='/cigars' className="nav-link text-white mx-3">Cigars</Link></li>
                        <li className="nav-item"><Link to='/glass' className="nav-link text-white mx-3">Glass</Link></li>
                        <li className="nav-item"><Link to='/vapes' className="nav-link text-white mx-3">Vapes</Link></li>
                        <li className="nav-item"><Link to='/cbd' className="nav-link text-white mx-3">CBD</Link></li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/cigars" component={CigarsPage} />
                    <Route path="/vapes" component={VapesPage} />
                    <Route path="/glass" component={GlassPage} />
                    <Route path="/cbd" component={CBDPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
