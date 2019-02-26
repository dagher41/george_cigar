import React, { Component } from 'react';
import Helmet from 'react-helmet';
import data from './data';
import ProductList from '../_common/components/ProductsList';

class CBDPage extends Component {
    render() {
        return (
            <div>
                <Helmet
                    titleTemplate="%s | CBD"
                />
                <div className="vwh-100 bg-cbd-1 pt-5">

                </div>
                <div>
                    <ProductList products={data} backgroundClass="bg-cbd-tiled"></ProductList>
                </div>
            </div>
        );
    }
}

export default CBDPage;