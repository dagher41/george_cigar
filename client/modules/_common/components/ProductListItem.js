import React, { Component } from 'react';


class ProductListItem extends Component {

    render() {
        const imgUrl = this.props.productImages.length && this.props.productImages[0].url;
        return (
            <div className="col-sm-12 col-md-4">
                <div className="position-relative pt-100 w-100" >
                    <div className="p-4 my-4 m-md-4 bg-white shadow-1 cover-element">
                        <img loading="lazy" src={imgUrl} className="" width="100%" height="100%"></img>
                        <div className="bottom-overlay cover-element m-4"></div>
                        <div className="cover-element">
                            <div className="position-absolute from-bottom p-4 text-white">
                                <div className="p-3">
                                    <h3 className="font-weight-light m-0">{this.props.title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ProductListItem;