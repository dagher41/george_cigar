import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import styles from '../../assets/stylesheets/js/hamburger-styles';

class HamburgerNav extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        return (
            <Menu right styles={styles} burgerButtonClassName={"d-md-none"} isOpen={this.state.isOpen}>
                <h4 className="border-bottom text-white">{this.props.catalogName}</h4>
                {
                    this.props.pages.map(page =>
                        <div key={page.id}>
                            <NavLink
                                exact={!page.slug}
                                to={`/${page.slug || ''}`}
                                className="py-2 text-white"
                                activeClassName="border-bottom"
                                title={page.name}>
                                {page.name}
                            </NavLink>
                        </div>
                    )
                }
            </Menu >
        )
    }
}


export default HamburgerNav