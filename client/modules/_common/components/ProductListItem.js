import React, { Component } from 'react';


class ProductListItem extends Component {

    render() {
        return (
            <div className="col-sm-12 col-md-6">
                <div className="m-4 p-4 bg-white shadow-1 position-relative" style={{ 'height': '400px' }} >
                    <img src={this.props.imageUrl} className="" width="100%" height="100%"></img>
                    <div className="bottom-overlay cover-element m-4"></div>
                    <div className="cover-element">
                        <div className="position-absolute from-bottom p-4 text-white">
                            <div className="p-3 ">
                                <h3 className="font-weight-light">{this.props.title}</h3>
                                <p className="font-weight-light">{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ProductListItem;