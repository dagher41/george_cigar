import React, { Component } from 'react';
import QuoteList from './QuoteList'

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="vwh-100 bg-cigars-2 pt-5 row no-gutters">
                    <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 mt-150">
                        <h1 className="text-center text-white">Anaheim's Home for Premier Cigars, Vapes, Glass and CBD</h1>
                    </div>
                </div>
                <div className="container-fluid p-4">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 p-4">
                            <h2>Store Hours</h2>
                            <p>
                                Sunday-Wednesday 9:00am-10:00pm
                                <br />
                                Thursday-Saturday 9:00am-11:00pm
                            </p>
                            <h2>Location</h2>
                            <p>Convienently located in the center of Anaheim, minutes away from Disneyland, The Packing House and Center Promenade</p>
                            <iframe className="mt-4 shadow-1 p-4"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.4495364638265!2d-117.91255974943984!3d33.82651583694459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd6322b0675fb%3A0x1b88e11764d183a4!2sGeorge+Cigar+(Smoke+and+Vape)!5e0!3m2!1sen!2sus!4v1550940284713"
                                width="100%"
                                height="450"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="col-md-6 col-sm-12 p-4">
                            <div className="row no-gutters">
                                <h2>About Us</h2>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <img src="/images/georgecigar-9.jpg" width="100%" className="shadow-1 p-4"></img>
                                </div>
                                <div className="col-md-6 pl-md-4 mt-4 mt-sm-0">
                                    <h5>Nabil Dagher, Owner</h5>
                                    <p>
                                        I've worked in various customer service jobs ranging from bartending to jewelry sales and repairs. I built
                                        George Cigars with the goal of helping our customers find exactly what they are looking for and being completely satisifed
                                        with their experience.
                                    </p>
                                </div>
                            </div>
                            <div className="row no-gutters pt-5">
                                <h2>Our History</h2>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <img src="/images/georgecigar-114.jpg" width="100%" className="shadow-1 p-4"></img>
                                </div>
                                <p className="mt-4">
                                    George Cigars was founded in 2012. We started out with 5 boxes of cigars and a handful of various tobacco products. Since then
                                    we have grown to be Anaheim's most trusted cigar and smoke product retailer with a full humidor, a great selection of glass, vape and
                                    CBD products and a beautiful outdoor lounge to relax and enjoy your smoke.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 p-4">
                            <h2>What Our Customers Are Saying</h2>
                            <p>We've been proudly serving Anaheim since 2012. Here's what our customers are saying about us.</p>
                            <div className="row no-gutters">
                                <QuoteList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;