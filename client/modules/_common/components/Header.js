import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HamburgerNav from './HamburgerNav';
import logo from '../../../assets/images/social-media-02.png';

export default function () {
    return (
        <Fragment >
            <HamburgerNav />
            <div className="d-flex position-absolute w-100 px-3 px-md-5 py-4 z-99">

                <div className="mr-auto">
                    <Link to='/'><img src={logo} className="logo"></img></Link>
                </div>
                <div>
                    <h4 className="text-white text-center font-weight-bold">George Cigar &amp; Smoke</h4>
                    <div className="d-block d-sm-none">
                        <div className="d-flex">
                            <i className="lnr lnr-map-marker mr-2 text-white mt-1" />
                            <a href="https://goo.gl/maps/26yv96nFMxq" target="_blank" className="text-white">
                                804 S Anaheim Blvd<br /> Ste B<br />Anaheim&#44; CA 92805
                        </a>
                        </div>
                        <div className="d-flex">
                            <i className="lnr lnr-phone-handset mr-2 text-white mt-1" />
                            <a href="tel:714-780-1195" className="text-white"> &#40;714&#41;&#32;780&#45;1195</a>
                        </div>
                    </div>
                    <ul className="nav justify-content-center d-none d-md-flex">
                        <li className="nav-item"><NavLink exact={true} to='/' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="Home">Home</NavLink></li>
                        <li className="nav-item"><NavLink to='/cigars' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="Cigars">Cigars</NavLink></li>
                        <li className="nav-item"><NavLink to='/vape' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="Vape">Vape</NavLink></li>
                        <li className="nav-item"><NavLink to='/glass' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="Glass">Glass</NavLink></li>
                        <li className="nav-item"><NavLink to='/cbd' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="CBD / Kratom">CBD &#47; Kratom</NavLink></li>
                        <li className="nav-item"><NavLink to='/contact-us' className="nav-link text-white mx-3" activeClassName="bordered-bottom" title="Contact Us">Contact Us</NavLink></li>
                    </ul>
                </div>
                <div className="d-none d-sm-block mx-auto mx-md-0 ml-md-auto">
                    <div className="text-center text-md-left">
                        <div className="d-flex">
                            <i className="lnr lnr-map-marker mr-2 text-white mt-1" />
                            <a href="https://goo.gl/maps/26yv96nFMxq" target="_blank" className="text-white">
                                804 S Anaheim Blvd Ste B<br />Anaheim&#44; CA 92805
                        </a>
                        </div>
                        <div className="d-flex">
                            <i className="lnr lnr-phone-handset mr-2 text-white mt-1" />
                            <a href="tel:714-780-1195" className="text-white"> &#40;714&#41;&#32;780&#45;1195</a>
                        </div>
                    </div>
                </div>
                <div className="d-md-none box-60 ml-auto"></div>
            </div >
        </Fragment>
    );
}