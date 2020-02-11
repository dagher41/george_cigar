import React, { Fragment } from 'react'

export default props => {
    return (
        <Fragment>
            <h2>Business Hours</h2>
            <p dangerouslySetInnerHTML={{ __html: props.businessHours.join('<br />') }}>
            </p>
        </Fragment>
    )
}