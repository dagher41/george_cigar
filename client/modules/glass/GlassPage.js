import React, { Component } from 'react';
import Helmet from 'react-helmet';
import data from './data';
import ProductList from '../_common/components/ProductsList';

class GlassPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div>
                <Helmet
                    titleTemplate="%s | Glass"
                />
                <div className="vwh-100 bg-glass-1 pt-5 row no-gutters display-static">
                    <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                        <h1 className="text-center text-white mt-5">Glass Pieces and Accessories</h1>
                    </div>
                </div>
                <div>
                    <ProductList products={data} backgroundClass="bg-glass-tiled"></ProductList>
                </div>
            </div>
        );
    }
}

export default GlassPage;