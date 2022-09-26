import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartQuantity from "../cart/partials/CartQuantity";
import {
  addToCartAction,
  getCartsAction,
} from "../cart/_redux/action/CartAction";
import {showToast} from "../master/Helper/Notification";
import PriceCalculation from "../master/services/PriceCalculcation";
import SimpleModel from "../master/simpleModal/SimpleModel";
import {toCapitalized} from "../master/utlits/LetterFormat";
import ProductDetails from "../ourProducts/ProductDetails";
import AddToWishlist from "../wishlist/AddToWishlist";

const ProductMiniCard = ({product, style}) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [screenWidthValue, setscreenWidthValue] = useState("50%");

  // console.log('screenWidth', screenWidth)
  // let screenWidthValue = screenWidth <= "768px" ? "100%" : "50%" ;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.screen.width);
      if (window.screen.width > 768) {
        setscreenWidthValue("50%");
      } else {
        setscreenWidthValue("100%");
      }
    });
  }, [window.screen.width]);
  const login_data = JSON.parse(localStorage.getItem("loginData"));

  const access_token = login_data?.userData.access_token;
  // console.log('first', access_token)
  const dispatch = useDispatch();
  const {
    id,
    name,
    short_description,
    full_description,
    regular_price,
    sell_price,
    is_in_wishlist,
    discount,
    stock,
    image,
    gallery,
  } = product;
  // console.log(id, "id....");

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
  const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  const [itemRemove, setItemRemove] = useState(false);
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
      const newFilterCarts = carts.find(
        (item) => item.product_id == product.id
      );
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.qty);
        setUpdatedID(newFilterCarts.product_id);
        setQuantity(newFilterCarts.qty);
        setTotalAmount(newFilterCarts.qty * default_price);
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
  //     }
  // };

  const addToCart = () => {
    if (stock > 0) {
      dispatch(addToCartAction(product));
    } else {
      showToast("error", "Sorry! Currently this product is out of stock!");
    }
    // dispatch(addToCartAction(product));
  };

  // console.log('filterCartss={filterCarts}', filterCarts)
  return (
    <React.Fragment>
      <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4 productParentCard">
        {/* <div className={(typeof stock !== "undefined" && stock !== null && stock !== "" && stock > 0) ? "product_cart_item shadow-sm pointer" : "product_cart_item stock_out shadow-sm pointer"} style={style}> */}
        <div className="product_cart_item shadow-sm pointer" style={style}>
          <div className="product_thumb">
            <div>
              <div className="d-flex justify-content-between">
                {/* <p className="discount_percantage">10%</p> */}
                <p className="discount_percantage">
                  {typeof stock !== "undefined" &&
                  stock !== null &&
                  stock !== "" &&
                  stock > 0 ? (
                    <span className="in_stock">In Stock </span>
                  ) : (
                    <span className="out_stock">Out of stock</span>
                  )}
                </p>

                <AddToWishlist
                  id={id}
                  is_in_wishlist={is_in_wishlist}
                  setItemRemove={setItemRemove}
                  itemRemove={itemRemove}
                />
              </div>
              <div onClick={() => handleShow(id)}>
                <div className="text-center product_image">
                  <img src={image} alt={name} className="img-fluid" />
                </div>
                <div className="product_details text-left">
                  <Link className="product_category" to="/">
                    {"category"}
                  </Link>
                  <h6>{toCapitalized(name)}</h6>
                  {/* <p className="current_stock">{parseInt(product.stock)} In Stock</p> */}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <PriceCalculation item={product} />

              {typeof filterCarts !== "undefined" && filterCarts !== null ? (
                <CartQuantity cart={filterCarts} stock={stock} />
              ) : (
                <div className="product_cart_btn" onClick={() => addToCart()}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {access_token && (
        <SimpleModel
          show={show}
          screenWidthValue={screenWidthValue}
          handleClose={handleClose}
          size="xl"
          onHide={() => setShow(false)}>
          <ProductDetails
            product={product}
            id={productID}
            quantity={quantity}
            setQuantity={setQuantity}
            screenWidthValue={screenWidthValue}
          />
        </SimpleModel>
      )}
    </React.Fragment>
  );
};

export default ProductMiniCard;
