import React from "react";
import CartQuantity from "./partials/CartQuantity";
import { deleteCartItemAction } from "./_redux/action/CartAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

/**
 *
 * @param {object} cart object
 * @param {boolean} isRemovable true or false // isRemovable = true is default value
 * @param {object} style //custom inline style if need it.
 * @param {boolean} isUpgrade //if need to updated quantity button active then pass value true, otherwise false. Here's default value is true,
 * @returns CartItem
 */
const CartItem = ({
  item,
  isRemovable = true,
  child_style,
  isUpgrade = true,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={`cart-product-item ${child_style}`}>
      {isRemovable && (
        <div
          className="close-item"
          onClick={() => dispatch(deleteCartItemAction(item.product_id))}
        >
          <i className="fas fa-times"></i>
        </div>
      )}
      <div className="row align-items-center mt-3">
        <div className="col-4 p-0">
          <div className="thumb cart_thumb text-center">
            <a href="/">
              <img
                style={{ width: "60px", height: "60px" }}
                src={item.product_image}
                alt={item.product_name}
                className="img-fluid img-thumbnail"
              />
            </a>
          </div>
        </div>
        <div className="col-8">
          <div className="product-content">
            <Link to="/" className="product-title">
              {item.product_name}
            </Link>
            <div style={{display:"flex", flexDirection:"row"}} >
            <CartQuantity cart={item} isUpgrade={isUpgrade} />
            <div >
              {typeof item.offer_price !== "undefined" &&
              item.offer_price !== null &&
              item.offer_price !== "" ? (
                <div className="product-price">
                  <del>{item.price}</del>
                  <span className="ml-4">{item.offer_price}</span>
                </div>
              ) : (
                <div className="product-price">
                  <span className="ml-4">{item.price} Tk.</span>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row align-items-center mt-2">
        <div className="col-6">
          
        </div>
        
      </div> */}
    </div>
  );
};

export default CartItem;
