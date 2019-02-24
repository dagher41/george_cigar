import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ProductList from '../_common/components/ProductsList';
import ProductListBuilder from '../_common/components/ProductListBuilder';

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
                    <ProductList products={this.props.products || []} requestPending={this.props.requestPending} backgroundClass="bg-cbd-tiled"></ProductList>
                </div>
            </div>
        );
    }
}

export default ProductListBuilder(CBDPage, { tag: 'cbd' });