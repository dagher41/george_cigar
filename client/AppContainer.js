import React from 'react';
import Helmet from 'react-helmet';
import routes from './routes';
import { Provider } from 'react-redux';

export default function AppContainer(props) {
    return (
        <Provider store={props.store}>
            <Helmet
                title="George Cigar &amp; Smoke"
                meta={[
                    { charset: 'utf-8' },
                    {
                        'http-equiv': 'X-UA-Compatible',
                        content: 'IE=edge',
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                    },
                ]}
            >
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Helmet>
            {routes}
        </Provider >
    );
}
