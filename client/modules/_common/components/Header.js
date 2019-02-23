import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

export default function () {
    return (
        <div>
            <div className="position-absolute w-100 mt-4 mb-5 z-99">
                <Link to='/' className="position-absolute top-left"><img src={logo} className="top-right"></img></Link>
                <ul className="nav justify-content-center">
                    <li className="nav-item"><NavLink exact={true} to='/' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Home</NavLink></li>
                    <li className="nav-item"><NavLink to='/cigars' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Cigars</NavLink></li>
                    <li className="nav-item"><NavLink to='/vapes' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Vapes</NavLink></li>
                    <li className="nav-item"><NavLink to='/glass' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Glass</NavLink></li>
                    <li className="nav-item"><NavLink to='/cbd' className="nav-link text-white mx-3" activeClassName="bordered-bottom">CBD</NavLink></li>
                    <li className="nav-item"><NavLink to='/contact-us' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Contact Us</NavLink></li>
                </ul>
                <div className="position-absolute top-right">
                    <p>
                        <a href="https://goo.gl/maps/26yv96nFMxq" target="_blank" className="text-white">
                            804 S Anaheim Blvd Ste B<br />Anaheim&#44; CA 92805
                        </a><br />
                        <a href="tel:714-780-1195" className="text-white">&#40;714&#41;&#32;780&#45;1195</a>
                    </p>
                </div>
            </div>
        </div>
    );
}