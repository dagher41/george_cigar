import React, { Component } from 'react';

export default function (WrappedComponent) {
    return class extends Component {

        componentDidMount() {
            window.scrollTo(0, 0)
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}