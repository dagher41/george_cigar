import React from 'react';
import { Link } from 'react-router-dom';
import instaLogo from '../../../assets/images/instagram_logo.png';

export default function () {
    return (
        <div className="row no-gutters bg-gray text-white p-5">
            <div className="col-sm-12 col-md-4">
                <h5 className="border-bottom mr-5">Contact</h5>
                <div>George Cigars</div>
                <a href="https://goo.gl/maps/26yv96nFMxq" target="_blank" className="text-white">
                    804 S Anaheim Blvd Ste B<br />Anaheim&#44; CA 92805
                        </a><br />
                <a href="tel:714-780-1195" className="text-white">&#40;714&#41;&#32;780&#45;1195</a>
            </div>
            <div className="col-sm-12 col-md-4 my-md-0 my-4">
                <h5 className="border-bottom mr-5">Site</h5>
                <div><Link to='/' className="py-2 text-white">Home</Link></div>
                <div><Link to='/cigars' className="py-2 text-white">Cigars</Link></div>
                <div><Link to='/vape' className="py-2 text-white">Vape</Link></div>
                <div><Link to='/glass' className="py-2 text-white">Glass</Link></div>
                <div><Link to='/cbd' className="py-2 text-white">CBD &#47; Kratom</Link></div>
                <div><Link to='/contact-us' className="py-2 text-white">Contact Us</Link></div>
            </div>
            <div className="col-sm-12 col-md-4">
                <h5 className="border-bottom mr-5">Social</h5>
                <div>
                    <img src={instaLogo} alt="" height="50px" />
                </div>
            </div>
        </div >
    );
}