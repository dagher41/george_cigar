import React, { Component } from 'react';


class ProductListItem extends Component {

    render() {
        return (
            <div className="col-sm-12 col-md-6">
                <div className="m-4 p-4 bg-white shadow-1" style={{ 'height': '400px' }} >
                    <img src={this.props.imageUrl} className="" width="100%" height="100%"></img>
                </div>
            </div >
        );
    }
}

export default ProductListItem;