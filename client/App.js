import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './modules/home/Home';
import Cigars from './modules/cigars/Cigars';

export class App extends Component {
    render() {
        return (
            <div>
                <Link to='/'>Go to Home Page</Link>
                <br />
                <Link to='/cigars'>Go to Cigars Page</Link>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/cigars" component={Cigars} />
                </Switch>
            </div>
        );
    }
}

export default App;
