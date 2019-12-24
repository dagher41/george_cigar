import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
    render() {
        return (
            <div className={`shadow-inset-1 row no-gutters ${this.props.backgroundClass}`}>

                <div className={`col-sm-12 col-md-10 offset-md-1 mx-auto pull-up-50 bg-white rounded position-relative shadow-1 ${this.props.backgroundClass} sm`}>
                    {this.props.requestPending ? (
                        <div className="d-flex justify-content-center w-100">
                            <div className='spinner-border spinner-border m-5 p-5' role="status" aria-hidden="true"></div>
                        </div>
                    ) : (
                            this.props.sections.map(section =>
                                <div key={section.id}>
                                    <div className="row m-4 shadow-1 bg-white position-relative">
                                        <div className="quote"></div>
                                        <div className="col p-4">
                                            <h3>{section.title}</h3>
                                            <p className="font-18 mb-0">
                                                {section.body}
                                            </p>
                                            <p className="d-flex justify-content-end font-18">
                                                - Nabil
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        {section.products.map(product => <ProductListItem {...product} key={product.id} />)}
                                    </div>
                                </div>
                            )
                        )}
                </div>
            </div >
        );
    }
}

ProductList.propTypes = {
    sections: PropTypes.array.isRequired
}

export default ProductList;