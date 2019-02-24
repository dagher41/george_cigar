import React, { Component } from 'react';
import { connect } from "react-redux";
import { emailChanged, messageChanged, postMessage } from './contact-us.actions';

class ContactUsPage extends Component {
    constructor(props) {
        super(props);
        this.formValidations = {};
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onEmailChange(e) {
        this.props.dispatch(emailChanged(e.target.value));
    }

    onMessageChange(e) {
        this.props.dispatch(messageChanged(e.target.value));
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.dispatch(postMessage({
            email: this.props.email,
            message: this.props.message
        }));
    }

    render() {
        return (
            <div className="vwh-100 bg-contact-1 pt-5 row no-gutters display-static text-white">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2"></div>
                <div className="col-md-6">
                    <div className="ml-5">
                        <h1 className="">We are here for you</h1>
                        <h4>Let us know what products you would like us to carry, your thoughts about our store or just general feedback.</h4>
                    </div>
                </div>
                <div className="col-md-4 offset-md-1">
                    <div className="form-group mr-5">
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <div className="row no-gutters">
                                <label htmlFor="emailInput">Email address</label>
                                <input type="email"
                                    className="form-control"
                                    id="emailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={this.props.email}
                                    onChange={e => this.onEmailChange(e)} />
                                <small id="emailHelp"
                                    className="form-text">
                                    We'll never share your email with anyone else.
                            </small>
                            </div>
                            <div className="row no-gutters mt-4">
                                <label htmlFor="messageInput">Message</label>
                                <textarea type="text"
                                    className="form-control"
                                    id="messageInput"
                                    placeholder="Your message to us"
                                    rows="7"
                                    onChange={e => this.onMessageChange(e)}>
                                    {this.props.message}
                                </textarea>
                            </div>
                            <div className="row no-gutters mt-4 float-right">
                                <input type="submit"
                                    className={`btn btn-outline-light ${this.props.messagePosting ? 'd-none' : ''}`}
                                    value="Send Message" />
                                <div className={`spinner-border spinner-border ${this.props.messagePosting ? '' : 'd-none'}`} role="status" aria-hidden="true"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ contactForm: state }) {
    return {
        email: state.email,
        message: state.message,
        messagePosting: state.messagePosting,
        messagePosted: state.messagePosted
    }
}

export default connect(mapStateToProps)(ContactUsPage);