import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFloatingCart } from "../../_redux/_global_store/action/GlobalAction";
import CartQuantity from "./partials/CartQuantity";
import {
  deleteCartItemAction,
  getCartsAction,
} from "./_redux/action/CartAction";
import itemNotFound from "./../../assets/images/not_found/Empty_Cart.png";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { showToast } from "./../master/Helper/Notification";

function FloatingCart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { floatingCartVisible } = useSelector((state) => state.GlobalReducer);
  const { carts, totalPrice } = useSelector((state) => state.CartReducer);
  // console.log(totalPrice)

  const [show, setShow] = useState(false);

  const toggleCartHandler = () => {
    dispatch(toggleFloatingCart(false));
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  const handleClose = () => {
    setShow((preState) => !preState);
  };

  /**
   * Redirect to checkout page
   * Toggle also the cart handler on sidebar
   *
   * @since 1.0.0
   *
   * return void
   */
  // const redirectToCheckout = () => {
  //   toggleCartHandler();
  //   router.push("/checkout").then((_) => window.scrollTo(0, 0));
  // };

  let floatingCart = null;

  const redirectToCheckoutPage = () => {
    if (typeof carts !== "undefined" && carts !== null && carts.length > 0) {
      history.push("/checkout");
    } else {
      showToast("error", "Please add product to your cart first!");
    }
  };

  if (floatingCartVisible === true) {
    floatingCart = (
      <>
        <div>
          <div
            id="sitebar-cart"
            className={
              floatingCartVisible === true
                ? "sitebar-cart open-cart"
                : "sitebar-cart"
            }
          >
            <div className="sc-head d-flex justify-content-between align-items-center">
              <div className="cart-count">
                <svg
                  version="1.1"
                  xmlns="http:www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20px"
                  height="20px"
                  viewBox="0 0 472.337 472.336"
                  style={{ enableBackground: "new 0 0 472.337 472.336;" }}
                  space="preserve"
                >
                  <path
                    d="M406.113,126.627c0-5.554-4.499-10.05-10.053-10.05h-76.377V91.715C319.684,41.143,278.543,0,227.969,0
                    c-50.573,0-91.713,41.143-91.713,91.715v24.862H70.45c-5.549,0-10.05,4.497-10.05,10.05L3.914,462.284
                    c0,5.554,4.497,10.053,10.055,10.053h444.397c5.554,0,10.057-4.499,10.057-10.053L406.113,126.627z M156.352,91.715
                    c0-39.49,32.13-71.614,71.612-71.614c39.49,0,71.618,32.13,71.618,71.614v24.862h-143.23V91.715z M146.402,214.625
                    c-9.92,0-17.959-8.044-17.959-17.961c0-7.269,4.34-13.5,10.552-16.325v17.994h14.337v-18.237
                    c6.476,2.709,11.031,9.104,11.031,16.568C164.363,206.586,156.319,214.625,146.402,214.625z M310.484,214.625
                    c-9.922,0-17.959-8.044-17.959-17.961c0-7.269,4.341-13.495,10.548-16.325v17.994h14.338v-18.241
                    c6.478,2.714,11.037,9.108,11.037,16.568C328.448,206.586,320.407,214.625,310.484,214.625z"
                  ></path> 
                </svg>
                <span>{carts.length} { carts.length > 1 ? "Items" :"Item"}</span>
              </div>
              <span onClick={toggleCartHandler} className="close-icon">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="cart-product-container">
              {typeof carts !== "undefined" &&
                carts.length > 0 &&
                carts.map((item, index) => (
                  <CartItem item={item} isRemovable={true} />
                ))}

              {carts.length <= 0 && (
                <div className="floating_cart__not_found mt-2 p-4 text-center">
                  <img
                    src={itemNotFound}
                    alt="empty cart"
                    className="img-fluid"
                  />
                  <p>
                    Oop!!! Your cart is empty ! <br /> Start shopping
                  </p>
                </div>
              )}
            </div>
            <div className="cart-footer">
              <div className="product-other-charge">
                <p className="d-flex justify-content-between">
                  <span>Delevery charge</span>
                  <span>$8.00</span>
                </p>
                <a href="/">Do you have a voucher?</a>
              </div>

              <div className="cart-total">
                <p className="saving d-flex justify-content-between">
                  <span>Sub Total</span>
                  <span>{totalPrice} Tk</span>
                </p>
                <p className="saving d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>{carts.length > 0 ? 50 : 0} Tk</span>
                </p>
                <p className="total-price d-flex justify-content-between">
                  <span>Total</span>
                  <span>
                    {carts.length > 0 ? totalPrice + 50 : totalPrice} Tk
                  </span>
                </p>
                <span
                  onClick={redirectToCheckoutPage}
                  className="procced-checkout pointer"
                >
                  Proceed to Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return floatingCart;
}

export default FloatingCart;
