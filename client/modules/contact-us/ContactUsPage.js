import React, { Component } from 'react';
import { connect } from "react-redux";
import { emailChanged, messageChanged, postMessage } from './contact-us.actions';

class ContactUsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { formValidations: {} };
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
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-150"></div>
                <div className="row px-0 px-md-5">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group mx-4 mx-md-0 mr-md-4">
                            <div>
                                <h3 className="">We are here for you</h3>
                                <h4>Let us know what products you would like us to carry, your thoughts about our store or just general feedback.</h4>
                                <hr className="bg-white seperator" />
                            </div>
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
                                        rows="6"
                                        onChange={e => this.onMessageChange(e)}
                                        value={this.props.message}>

                                    </textarea>
                                </div>
                                <div className="row no-gutters mt-4">
                                    <input type="submit"
                                        className={`btn btn-outline-light ${this.props.messagePosting ? 'd-none' : ''}`}
                                        value={this.props.messagePosted ? 'Send Another Message' : 'Send Message'} />
                                    <div className={`spinner-border spinner-border ${this.props.messagePosting ? '' : 'd-none'}`} role="status" aria-hidden="true"></div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 d-none d-sm-block">
                        <div className="mx-4 mx-md-0 mr-md-4">
                            <h3>Business Information</h3>
                            <h4 className="mt-3">
                                <i className="lnr lnr-map-marker mr-2" />Address
                            </h4>
                            <p>
                                <a href="https://goo.gl/maps/26yv96nFMxq" target="_blank" className="text-white">
                                    804 S Anaheim Blvd Ste B<br />Anaheim&#44; CA 92805
                                </a>
                            </p>
                            <h4 className="mt-4">
                                <i className="lnr lnr-phone-handset mr-2" />Phone
                            </h4>
                            <p>
                                <a href="tel:714-780-1195" className="text-white">&#40;714&#41;&#32;780&#45;1195</a>
                            </p>
                            <h4 className="mt-4">
                                <i className="lnr lnr-envelope mr-2" />Email
                            </h4>
                            <p>
                                <a href="mailto:nabil@georgecigar.com" className="text-white">nabil@georgecigar.com</a>
                            </p>
                            <h4 className="mt-4">
                                <i className="lnr lnr-store mr-2" />Store Hours
                            </h4>
                            <h2></h2>
                            <p>
                                Sunday-Wednesday 9:00am-10:00pm
                                <br />
                                Thursday-Saturday 9:00am-11:00pm
                            </p>
                        </div>
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