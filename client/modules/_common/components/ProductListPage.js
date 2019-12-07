import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { requestProducts } from '../reducers/product-list.actions';
import ProductList from '../components/ProductsList';

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
                <div className={`vwh-100 pt-5 row no-gutters display-static ${this.props.heroClassName}`}>
                    <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-150">
                        <h1 className="text-center text-white px-4 px-md-0">{this.props.heroText}</h1>
                    </div>
                </div>
                <div>
                    <ProductList
                        sections={this.props.sections || []}
                        productTitle={this.props.productListTitle}
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
    productListTitle: PropTypes.string.isRequired,
    heroClassName: PropTypes.string.isRequired,
    listClassName: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    heroText: PropTypes.string,
    productListDescription: PropTypes.string
}

function mapStateToProps({ productList: state }) {
    return {
        sections: state.sections,
        requestPending: state.requestPending
    };
}

export default connect(mapStateToProps)(ProductListPage);