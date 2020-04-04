import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import pageComponentMap from '../'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Helmet
                    title={this.props.catalogName}
                    meta={[{
                        charset: 'utf-8'
                    }, {
                        'http-equiv': 'X-UA-Compatible',
                        content: 'IE=edge',
                    }, {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                    }]}
                >
                    <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.AWS_S3_BUCKET}/${this.props.faviconPrefix}/favicons/apple-touch-icon.png`} />
                    <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.AWS_S3_BUCKET}/${this.props.faviconPrefix}/favicons/favicon-32x32.png`} />
                    <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.AWS_S3_BUCKET}/${this.props.faviconPrefix}/favicons/favicon-16x16.png`} />
                    <link rel="manifest" href={`${process.env.AWS_S3_BUCKET}/${this.props.faviconPrefix}/favicons/site.webmanifest`} />
                </Helmet>
                <Header
                    pages={this.props.pages}
                    logoSrc={this.props.logoSrc}
                    contact={this.props.contact}
                    catalogName={this.props.catalogName}
                    address={this.props.address}
                />
                <Switch>
                    {
                        this.props.pages.map(page => {
                            return <Route
                                key={page.id}
                                exact={!page.slug}
                                path={`/${page.slug || ''}`}
                                render={() => {
                                    const TemplateComponent = pageComponentMap[page.templateId];
                                    return <TemplateComponent
                                        productTitle={page.name}
                                        tagName={page.slug}
                                        logoSrc={this.props.logoSrc}
                                        contact={this.props.contact}
                                        catalogName={this.props.catalogName}
                                        address={this.props.address}
                                        social={this.props.social}
                                        businessHours={this.props.businessHours}
                                        {...page.clientMetadata.componentData}
                                    />
                                }}>
                            </Route>
                        })
                    }
                </Switch>
                <Footer
                    pages={this.props.pages}
                    contact={this.props.contact}
                    catalogName={this.props.catalogName}
                    address={this.props.address}
                    social={this.props.social} />
            </div >
        );
    }
};