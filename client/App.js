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
                            productListDescription="Whether you enjoy a smoking fine cigar, pipe tobacco or a cigarillo, you’ll find a large selection here at George’s.   Our current collection contains the following with more additions made on a weekly basis"
                            tagName="cigars"
                            heroClassName="bg-cigars-1"
                            heroText="Cigars, Pipes and Tobacco Accessories"
                            listClassName="bg-cigars-tiled"
                        />} />
                    <Route path="/vape"
                        render={() => <ProductListPage
                            productTitle="Vapes"
                            productListTitle="Vape"
                            productListDescription="Shop our large variety of vape kits and e-juices.   George’s friendly staff also offers repair services for most vape kits.  Take a look at our selection:"
                            tagName="vapes"
                            heroClassName="bg-vapes-1"
                            heroText="Vape Kits, E-Juices and Vape Accessories"
                            listClassName="bg-vape-tiled"
                        />} />
                    <Route path="/glass"
                        render={() => <ProductListPage
                            productTitle="Glass"
                            productListTitle="Glass"
                            productListDescription="With one of the largest selection of unique glass pieces in the area, George’s is the place to come your glass related needs.   Here is a small sample of what we carry:"
                            tagName="glass"
                            heroClassName="bg-glass-1"
                            heroText="Glass Pipes and Glass Accessories"
                            listClassName="bg-glass-tiled"
                        />} />
                    <Route path="/cbd"
                        render={() => <ProductListPage
                            productTitle="CBD"
                            productListTitle="CBD"
                            productListDescription="George’s brings you the healing properties of CBD and Kratom with a wide selection of related products.  Check out our assortment to choose from:"
                            tagName="cbd"
                            heroClassName="bg-cbd-1"
                            heroText="Our CBD/Kratom Selection"
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
