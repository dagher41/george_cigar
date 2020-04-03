import React, { Component } from 'react';
import { connect } from "react-redux";
import { requestReviews } from './redux/generic-hero-page.actions'
import BlockQoute from './BlockQuote';

class QuoteList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(requestReviews());
    }

    render() {
        return (
            <div className="col-12">
                {this.props.requestPending ? (
                    <div className="d-flex justify-content-center w-100">
                        <div className='spinner-border spinner-border m-5 p-5' role="status" aria-hidden="true"></div>
                    </div>
                ) : (
                        this.props.reviews.map(review =>
                            <BlockQoute
                                key={review.id}
                                quote={review.body}
                                author={review.authorName}
                                source={review.source}
                            />)
                    )}

            </div>
        );
    }
}

function mapStateToProps({ reviewsList: state }) {
    return {
        reviews: state.reviews,
        requestPending: state.requestPending
    };
}

export default connect(mapStateToProps)(QuoteList);