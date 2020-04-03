import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { requestProducts } from './redux/product-list.actions';
import ProductList from './ProductsList';
import HeroImage from '../_common/components/HeroImage';

class ProductListPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.dispatch(requestProducts(this.props.tagName));
    }

    componentDidUpdate(previousProps) {
        if (previousProps.tagName != this.props.tagName) {
            window.scrollTo(0, 0);
            this.props.dispatch(requestProducts(this.props.tagName));
        }
    }

    render() {
        return (
            <div>
                <Helmet
                    titleTemplate={`%s | ${this.props.productTitle}`}
                />
                <HeroImage {...this.props} />
                <div>
                    <ProductList
                        productGroups={this.props.productGroups || []}
                        productListDescription={this.props.productListDescription}
                        requestPending={this.props.requestPending}
                        backgroundClass={this.props.listClassName}
                    />
                </div>
            </div>
        );
    }
}

ProductListPage.propTypes = {
    productTitle: PropTypes.string.isRequired,
    heroClassName: PropTypes.string.isRequired,
    listClassName: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    heroText: PropTypes.string,
    productListDescription: PropTypes.string
}

function mapStateToProps({ productList: state }) {
    return {
        productGroups: state.productGroups,
        requestPending: state.requestPending
    };
}

export default connect(mapStateToProps)(ProductListPage);