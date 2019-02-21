import React, { Component } from 'react';


class ProductListItem extends Component {

    render() {
        return (
            <div className="col-5 m-4 p-4 bg-white shadow-1">
                <img src={this.props.imageUrl} className="col" width="100%"></img>
            </div>
        );
    }
}

export default ProductListItem;