import React from 'react';
import { useDispatch } from 'react-redux';
import "./SimpleButton.css"
/**
 * @param {string} //button text named text
 * @param fontAwesome nullable * 
 * @returns SimpleButton
 */
const SimpleButton = ({ text, fontAwesome = null, style }) => {
    
    const dispatch = useDispatch();
    return (
        <button className="btn simple_default_btn" style={style}>
            <div className="d-flex">
                {fontAwesome !== null ? "" : fontAwesome}
                {text}
            </div>
        </button>
    );
};
export default SimpleButton;