import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
    render() {
        return (
            <div className={`shadow-inset-1 row no-gutters ${this.props.backgroundClass}`}>

                <div className={`col-sm-12 col-md-10 offset-md-1 mx-auto pull-up-50 bg-white rounded position-relative shadow-1 ${this.props.backgroundClass} sm`}>
                    <div className="row m-4 shadow-1 bg-white">
                        <div className="col p-4">
                            <h3>Our {this.props.productTitle} Products</h3>
                            <p>
                                {this.props.productListDescription}
                            </p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        {this.props.requestPending ? (
                            <div className="d-flex justify-content-center w-100">
                                <div className='spinner-border spinner-border m-5 p-5' role="status" aria-hidden="true"></div>
                            </div>
                        ) : (
                                this.props.products.map(product => <ProductListItem {...product} key={product.id} />)
                            )}
                    </div>
                </div>
            </div >
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        productListDescription: PropTypes.string,
        productImages: PropTypes.array
    })).isRequired
}

export default ProductList;