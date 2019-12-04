import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import styles from '../../../assets/stylesheets/js/hamburger-styles';

class HamburgerNav extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        return (
            <Menu right styles={styles} burgerButtonClassName={"d-md-none"} isOpen={this.state.isOpen}>
                <h4 className="border-bottom text-white">George Cigars</h4>
                <div>
                    <NavLink exact={true} to='/' className="py-2 text-white" activeClassName="border-bottom">Home</NavLink>
                </div>
                <div>
                    <NavLink to='/cigars' className="py-2 text-white" activeClassName="border-bottom">Cigars</NavLink>
                </div>
                <div>
                    <NavLink to='/vape' className="py-2 text-white" activeClassName="border-bottom">Vapes</NavLink>
                </div>
                <div>
                    <NavLink to='/glass' className="py-2 text-white" activeClassName="border-bottom">Glass</NavLink>
                </div>
                <div>
                    <NavLink to='/cbd' className="py-2 text-white" activeClassName="border-bottom">CBD &#47; Kratom</NavLink>
                </div>
                <div>
                    <NavLink to='/contact-us' className="py-2 text-white" activeClassName="border-bottom">Contact Us</NavLink>
                </div>
            </Menu >
        )
    }
}


export default HamburgerNav