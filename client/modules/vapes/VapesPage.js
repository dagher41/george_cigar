import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ProductList from '../_common/components/ProductsList';
import ProductListBuilder from '../_common/components/ProductListBuilder';

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
                    <ProductList products={this.props.products || []} requestPending={this.props.requestPending} backgroundClass="bg-vape-tiled"></ProductList>
                </div>
            </div>
        );
    }
}

export default ProductListBuilder(VapesPage, { tag: 'vapes' });