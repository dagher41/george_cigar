import React from 'react';

export default function (props) {
    return (
        <div className="bg-white shadow-1 my-4 position-relative">
            <div className="quote"></div>
            <blockquote className="m-0 p-4 position-relative">
                <h4>
                    {props.quote}
                    <br />
                </h4>
                <div className="d-flex justify-content-end">
                    <h5>&#45;{props.author}</h5>
                </div>
                <div className="d-flex justify-content-end">
                    <div>{props.source}</div>
                </div>
            </blockquote>
        </div>
    );
}