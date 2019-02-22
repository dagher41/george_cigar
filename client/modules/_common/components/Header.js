import React from 'React';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

export default function () {
    return (
        <div>
            <div className="position-absolute w-100 mt-4">
                <Link to='/' className="position-absolute logo"><img src={logo} className="logo"></img></Link>
                <ul className="nav justify-content-center">
                    <li className="nav-item"><NavLink exact={true} to='/' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Home</NavLink></li>
                    <li className="nav-item"><NavLink to='/cigars' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Cigars</NavLink></li>
                    <li className="nav-item"><NavLink to='/glass' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Glass</NavLink></li>
                    <li className="nav-item"><NavLink to='/vapes' className="nav-link text-white mx-3" activeClassName="bordered-bottom">Vapes</NavLink></li>
                    <li className="nav-item"><NavLink to='/cbd' className="nav-link text-white mx-3" activeClassName="bordered-bottom">CBD</NavLink></li>
                </ul>
            </div>
        </div>
    );
}