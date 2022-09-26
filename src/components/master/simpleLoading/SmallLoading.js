import React from 'react';
import ReactLoading from "react-loading";

/**
 * @param string type // loading type like balls, bars, bubbles, cubes, cylon, spin, spokes
 * @param string height // Like "30px"
 * @param string width // Like "30px"
 * @param string color // color code Like "fff"
 * @returns SmallLoading
 */
const SmallLoading = ({ type = "spokes", width = "30px", height = "30px", color = "#1c733e", }) => {

    return (
        <ReactLoading type={type} style={{width: width, height: height, fill: color}} />
    );
};

export default SmallLoading;