/** @format */

import {types} from "@babel/core";
import {faHeart, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartQuantity from "../cart/partials/CartQuantity";
import {
  addToCartAction,
  deleteCartItemAction,
  getCartsAction,
  handleQuantity,
  updateCartQtyAction,
} from "../cart/_redux/action/CartAction";
import PriceCalculation from "../master/services/PriceCalculcation";
import SimpleModel from "../master/simpleModal/SimpleModel";
import ProductDetails from "../ourProducts/ProductDetails";
import AddToWishlist from "../wishlist/AddToWishlist";

const SlickProductCard = ({product, style}) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    short_description,
    full_description,
    regular_price,
    sell_price,
    discount,
    stock,
    stock_out,
    sku,
    image,
    gallery,
  } = product;

  const default_price =
    sell_price && sell_price !== 0 && sell_price !== "" && sell_price !== null
      ? sell_price
      : regular_price;

  const {carts, cartQuantity} = useSelector((state) => state.CartReducer);
  const [filterCarts, setFilterCarts] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [updatedID, setUpdatedID] = useState(null);
  const [totalAmount, setTotalAmount] = useState(default_price);
  const [show, setShow] = useState(false);
  const [productID, setProductID] = useState(id);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setProductID(id);
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  useEffect(() => {
    if (product) {
      const newFilterCarts = carts.find((item) => item.productID == product.id);
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.quantity);
        setUpdatedID(newFilterCarts.productID);
        setQuantity(newFilterCarts.quantity);
        setTotalAmount(newFilterCarts.quantity * default_price);
        // setToggled(true)
      }
    }
  }, [product, carts, quantity]);

  // const updateQuantity = (quantity) => {
  //     if (
  //         typeof filterCarts !== "undefined" &&
  //         filterCarts !== null &&
  //         updatedID !== null
  //     ) {
  //         if (quantity === 0) {
  //             setQuantity(0);
  //             dispatch(deleteCartItemAction(updatedID));

  //         } else {
  //             setQuantity(filterCarts.quantity);
  //             dispatch(updateCartQtyAction(updatedID, quantity));
  //         }

  //     } else {
  //         setTotalAmount(quantity);
  //         setTotalAmount(default_price * quantity);
  //         // dispatch(handleQuantity(quantity))
  //     }product_cart_item stock_out shadow-sm pointer recommendSlickItem

  const addToCart = () => {
    dispatch(addToCartAction(product));
  };

  return (
    <React.Fragment>
      <div
        className={
          typeof stock_out !== "undefined" &&
          stock_out !== null &&
          stock_out !== ""
            ? "product_cart_item shadow-sm pointer recommendSlickItem"
            : "product_cart_item stock_out shadow-sm pointer recommendSlickItem"
        }
        style={style}>
        <div className="product_thumb">
          <div>
            <div className="d-flex justify-content-between">
              {/* <p className="discount_percantage">10%</p> */}
              <p className="discount_percantage">
                {typeof stock_out !== "undefined" &&
                stock_out !== null &&
                stock_out !== "" ? (
                  <span className="in_stock">In Stockkkkk</span>
                ) : (
                  <span className="out_stock">Out of stock</span>
                )}
              </p>

              {/* <AddToWishlist id={id} /> */}
            </div>
            <div onClick={() => handleShow(id)}>
              <div className="text-center product_image">
                <img src={image} alt={name} className="img-fluid" />
              </div>
              <div className="product_details text-left">
                <Link className="product_category" to="/">
                  {"category"}
                </Link>
                <h6>
                  <Link className="product_name" to="/">
                    {name}
                  </Link>
                </h6>
                {/* <p className="current_stock">{parseInt(product.stock)} In Stock</p> */}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <PriceCalculation item={product} />

            {typeof filterCarts !== "undefined" && filterCarts !== null ? (
              <CartQuantity cart={filterCarts} />
            ) : (
              <div className="product_cart_btn" onClick={() => addToCart()}>
                <FontAwesomeIcon icon={faShoppingCart} /> Add
              </div>
            )}
          </div>
        </div>
      </div>
      <SimpleModel
        show={show}
        handleClose={handleClose}
        size="xl"
        onHide={() => setShow(false)}>
        <ProductDetails id={productID} />
      </SimpleModel>
    </React.Fragment>
  );
};

export default SlickProductCard;
