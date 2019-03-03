import React, { Component } from 'react';
import { connect } from "react-redux";
import { requestProducts } from '../reducers/product-list.actions';

export default function (WrappedComponent, options) {
    class ProductListPage extends Component {
        componentDidMount() {
            this.props.dispatch(requestProducts(options.tag));
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return connect(mapStateToProps)(ProductListPage);

}

function mapStateToProps({ productList: state }) {
    return {
        products: state.products,
        requestPending: state.requestPending
    };
}