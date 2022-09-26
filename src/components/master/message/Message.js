import React from 'react';

/**
 * 
 * @param {string} param0 text
 * @param {object} param0 style
 * @returns Message component
 */
const Message = ({ text, style }) => {
    return (
        <React.Fragment>
            <p className="simple_error_message" style={style}>
                {text}
            </p>
        </React.Fragment>
    );
};

export default Message;