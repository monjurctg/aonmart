import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFloatingCart } from "../../_redux/_global_store/action/GlobalAction";
import { getCartsAction } from "./_redux/action/CartAction";

const FloatingCartButton = () => {
  const dispatch = useDispatch();
  const { carts, totalPrice } = useSelector((state) => state.CartReducer);

  // console.log(carts);

  const flashDealBtnHandler = () => {
    dispatch(toggleFloatingCart());
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  return (
    <div
      className="sidebar_drawer d-none d-lg-block"
      onClick={flashDealBtnHandler}
    >
      <div className="cart_count d-flex justify-content-center align-items-center">
        <i className="fas fa-shopping-basket"></i>
        <span>
          {carts.length} {carts.length > 1 ? "Items" : "Item"}{" "}
        </span>
      </div>
      <div className="total_price">{totalPrice} Tk</div>
    </div>
  );
};

export default FloatingCartButton;
