import React from 'react';
import ReactLoading from "react-loading";

/**
 * @param string type // loading type like balls, bars, bubbles, cubes, cylon, spin, spokes
 * @param string height // Like "20%"
 * @param string width // Like "20%"
 * @param string color // color code Like "fff"
 * @returns SimpleLoading
 */
const SimpleLoading = ({ type = "bubbles", height = "20%", width = "100%", color = "#1c733e" }) => {

    return (
        <div className="w-100 d-flex justify-content-center align-items-center">
            <ReactLoading type={type} height={height} color={color} />
        </div>
    );
};

export default SimpleLoading;