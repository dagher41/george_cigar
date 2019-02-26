import React, { Component } from 'react';
import Helmet from 'react-helmet';
import data from './data';
import ProductList from '../_common/components/ProductsList';

class VapesPage extends Component {
    render() {
        return (
            <div>
                <Helmet
                    titleTemplate="%s | Vapes"
                />
                <div className="vwh-100 bg-vapes-1 pt-5 row no-gutters display-static">
                    <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-150">
                        <h1 className="text-center text-white px-4 px-md-0">Vapes, Juices and Accessories</h1>
                    </div>
                </div>
                <div>
                    <ProductList products={data} backgroundClass="bg-vape-tiled"></ProductList>
                </div>
            </div>
        );
    }
}

export default VapesPage;