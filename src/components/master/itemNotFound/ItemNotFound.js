import React from 'react';
import itemNotFound from "./../../../assets/images/not_found/searchNotFound.png";

const ItemNotFound = ({ title = "Product"}) => {
    return (
        <div className="py-4 px-2">
            <div className="item_not_found_section shadow-sm">
                <h3 className="item_not_found_title"> {title} Not Found</h3>
                <p className="item_not_found_des">
                    We're sorry. We cannot find this {title} at this moment.
                </p>
                <img src={itemNotFound} alt="item not found" />
            </div>
        </div>
    );
};

export default ItemNotFound;