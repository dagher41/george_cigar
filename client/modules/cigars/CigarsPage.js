import React from 'react';
import Helmet from 'react-helmet';
import data from './data';
import ProductList from '../_common/components/ProductsList';

export default function () {
    return (
        <div>
            <Helmet
                titleTemplate="%s | Cigars"
            />
            <div className="vwh-100 bg-cigars-1 pt-5"></div>
            <div>
                <ProductList products={data}></ProductList>
            </div>
        </div>
    );
}