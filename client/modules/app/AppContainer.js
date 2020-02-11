import React, { Component } from 'react';
import { connect } from "react-redux";
import App from './App';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const extractAppKeys = ({
            id,
            logoSrc,
            catalogName,
            address,
            social,
            contact,
            businessHours,
            pages,
            faviconPrefix
        }) => ({ id, logoSrc, catalogName, address, social, contact, businessHours, pages, faviconPrefix });
        const appKeys = extractAppKeys(this.props);
        return (
            <App {...appKeys}></App>
        );
    }
}

function mapStateToProps({ catalogData: state }) {
    return { ...state };
}

export default connect(mapStateToProps)(AppContainer);