import React, { Component } from 'react';
import JsxParser from 'react-jsx-parser'

import QuoteList from './QuoteList';
import HeroImage from '../_common/components/HeroImage';
import BusinessHours from '../_common/components/BusinessHours';


class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <HeroImage {...this.props} />
                <JsxParser
                    bindings={{ ...this.props, ...this.props.contact }}
                    components={{ QuoteList, BusinessHours }}
                    jsx={this.props.content}
                />
            </div>
        );
    }
}

export default HomePage;