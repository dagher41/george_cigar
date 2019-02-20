import React from 'react';
import Helmet from 'react-helmet';
import routes from './routes';

export default function AppContainer() {
    return (
        <div>
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
        </div >
    );
}
