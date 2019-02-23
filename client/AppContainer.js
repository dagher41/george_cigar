import React from 'react';
import Helmet from 'react-helmet';
import routes from './routes';
import { Provider } from 'react-redux';

export default function AppContainer(props) {
    return (
        <Provider store={props.store}>
            <Helmet
                title="George's Cigar"
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
            />
            {routes}
        </Provider >
    );
}
