import React from 'react';
import JsxParser from 'react-jsx-parser'

export default (props) => {
    return (
        <div className={`vwh-100 pt-5 row no-gutters display-static ${props.heroClassName}`}>
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-150">
                <JsxParser
                    bindings={props}
                    components={{}}
                    jsx={props.heroContent}
                />
            </div>
        </div>
    );
}