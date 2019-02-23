import React from 'react';
import BlockQoute from '../_common/components/BlockQuote';

export default function () {
    return (
        <div>
            <div className="vwh-100 bg-cigars-2 pt-5 row no-gutters">
                <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                    <h1 className="text-center text-white mt-5">Anaheim's Premier Home for Cigars, Vapes and Glass</h1>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-12 p-4">
                        <h2>What Our Customers Are Saying</h2>
                        <p>We've been proudly serving Anaheim since 2012. Here's what our customers are saying about us.</p>
                        <div className="">
                            <BlockQoute
                                quote="Great service there and super nice, clean, and neat humidor room"
                                author="Dakota Burt"
                                source="Google Review"
                            />
                            <BlockQoute
                                quote="They had a beautiful walk in humidor and their selection was fantastic!"
                                author="Manny Gutierrez"
                                source="Google Review"
                            />
                            <BlockQoute
                                quote="Very nice staff, good selection, very helpful.  Best choice if you’re near Disney!"
                                author="Jason King"
                                source="Google Review"
                            />
                            <BlockQoute
                                quote="Cool spot. Nice selection and willing to listen to customers requests. Owner, wife, and son are nice, good people."
                                author="Roger J"
                                source="Yelp Review"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 p-4">
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
                </div>
            </div>
        </div>
    );
}