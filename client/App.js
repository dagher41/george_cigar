import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './modules/_common/components/Header';
import Footer from './modules/_common/components/Footer';
import HomePage from './modules/home/HomePage';
import ContactUsPage from './modules/contact-us/ContactUsPage';
import ScrollTop from './modules/_common/components/ScrollTop';
import ProductListPage from './modules/_common/components/ProductListPage';

export class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ScrollTop(HomePage)} />
                    <Route path="/cigars"
                        render={() => <ProductListPage
                            productTitle="Cigars"
                            productListTitle="Cigar"
                            tagName="cigars"
                            heroClassName="bg-cigars-1"
                            heroText="Cigars, Pipes and Humidors"
                            listClassName="bg-cigars-tiled"
                        />} />
                    <Route path="/vapes"
                        render={() => <ProductListPage
                            productTitle="Vapes"
                            productListTitle="Vape"
                            tagName="vapes"
                            heroClassName="bg-vapes-1"
                            heroText="Vapes, Juices and Accessories"
                            listClassName="bg-vape-tiled"
                        />} />
                    <Route path="/glass"
                        render={() => <ProductListPage
                            productTitle="Glass"
                            productListTitle="Glass"
                            tagName="glass"
                            heroClassName="bg-glass-1"
                            heroText="Glass Pieces and Accessories"
                            listClassName="bg-glass-tiled"
                        />} />
                    <Route path="/cbd"
                        render={() => <ProductListPage
                            productTitle="CBD"
                            productListTitle="CBD"
                            tagName="cbd"
                            heroClassName="bg-cbd-1"
                            heroText="Our CBD selection"
                            listClassName="bg-cbd-tiled"
                        />} />/>
                    <Route path="/contact-us" component={ScrollTop(ContactUsPage)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
