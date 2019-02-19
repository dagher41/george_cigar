import React from 'react';
import Helmet from 'react-helmet';

export default function () {
    return (
        <div>
            <Helmet
                titleTemplate="%s | Cigars"
            />
            <h2>Welcome to the Cigars</h2>
        </div>
    );
}