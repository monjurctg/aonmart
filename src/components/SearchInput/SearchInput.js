import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartQuantity from "../cart/partials/CartQuantity";
import {
  addToCartAction,
  getCartsAction,
  updateCartQtyAction
} from "../cart/_redux/action/CartAction";
import { showToast } from "../master/Helper/Notification";
import PriceCalculation from "../master/services/PriceCalculcation";
import SearchLoadingSkelleton from "./SearchLoadingSkelleton";
import { searchProductAction } from "./_redux/Action/SearchInputAction";
// import { translate } from "../../services/translation/translation";
// import Translate from "../translation/Translate";

const SearchInput = ({ product, id, cart, item }) => {
  // console.log(product, "search input");

  const [data, setDate] = useState(" ");
  const [show, setShow] = useState(false);

  // console.log(data);

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    // console.log(value, "value");

    setShow(true);
    setDate(value);
  };
  const default_price =
    data.sell_price &&
    data.sell_price !== 0 &&
    data.sell_price !== "" &&
    data.sell_price !== null
      ? data.sell_price
      : data.regular_price;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const suggestions = useSelector((state) => state.SearchReducer.products);
  const loading = useSelector((state) => state.SearchReducer.loading);
  const [updatedID, setUpdatedID] = useState(null);
  const [totalAmount, setTotalAmount] = useState(default_price);
  const searchProduct = (e) => {
    setSearch(e.target.value);
    dispatch(searchProductAction(e.target.value));
  };

  // console.log(`suggestions`, suggestions);

  const searchClick = (searchData) => {
    setSearch("");

    // if (searchData.is_item) {
    //   router
    //     .push(`/products/${searchData.slug}`)
    //     .then((_) => window.scrollTo(0, 0));
    // }
    // if (searchData.is_category) {
    //   router
    //     .push(`/products?category=${searchData.id}`)
    //     .then((_) => window.scrollTo(0, 0));
    // }
  };

  /* ------------------------------------------------------------------------------------------------ */
  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) || "";

  // const dispatch = useDispatch();
  const history = useHistory();

  const productDetails = useSelector(
    (state) => state.OurProductReducer.productDetails
  );
  const loadingDetails = useSelector(
    (state) => state.OurProductReducer.loadingDetails
  );
  const carts = useSelector((state) => state.CartReducer.carts);
  // const cartQuantity = useSelector((state) => state.CartReducer.cartQuantity);

  const [prevImg, setPrevImg] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [filterCarts, setFilterCarts] = useState(null);
  const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  useEffect(() => {
    // dispatch(getProductDetails(id, storeInformation?.storeID));
    dispatch(getCartsAction());
  }, []);

  useEffect(() => {
    if (productDetails !== null && productDetails !== "") {
      setPrevImg(productDetails.image);
    }
  }, [productDetails]);

  const zoomImg = {
    width: 500,
    height: 300,
    zoomWidth: 500,
    zoomPosition: "original",
    img: prevImg,
  };

  useEffect(() => {
    if (data) {
      const newFilterCarts = carts.find((item) => item.product_id == data.id);
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.qty);
        setUpdatedID(newFilterCarts.product_id);
        setQuantity(newFilterCarts.qty);
        setTotalAmount(newFilterCarts.qty * default_price);
        // setToggled(true)
      }
    }
  }, [data, carts, quantity, isAdding]);

  const addToCart = () => {
    if (data.stock > 0) {
      console.log(data.stock);
      dispatch(addToCartAction(data));
    } else {
      showToast("error", "Sorry! Currently this product is out of stock!");
    }
    // if (
    //   typeof carts !== "undefined" &&
    //   carts !== null &&
    //   carts !== "" &&
    //   carts.length > 0
    // ) {
    // history.push("/checkout");
    // } else {
    //   showToast("error", "Please update your cart first!");
    //   showToast("error", "Please update your cart first!fghtghnt");
    // psdvcdv
    // }
  };

  // const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(0)

  const updateQuantity = (quantity) => {
    if (typeof cart !== "undefined" && cart !== null && cart !== "") {
      setQuantity(quantity);
      dispatch(updateCartQtyAction(cart.productID, quantity));
    } else {
      setQuantity(quantity);
      dispatch(addToCartAction(item, { quantity }));
    }
  };

  useEffect(() => {
    if (typeof cart !== "undefined" && cart !== null && cart !== "") {
      setQuantity(cart.quantity);
    } else {
      setQuantity(quantity);
    }
  }, [cart]);

  // console.log(window.screen.width, "screen.width");

  return (
    <>
      <form className="header_search_product_menu_area form-inline mobile_device_form_inline top-search align-items-center justify-content-end" style={{flexWrap:"wrap"}}>
        <input
          className="form-control mx-0 form-controll-self"
          type="search"
          value={search}
          name="search"
          placeholder={window.screen.width >640 ? "Search products, categories...." :"Search products"}
          onChange={(e) => searchProduct(e)}
        />
        <button
          className="btn btn-success rounded-0 mx-0"
          type="button"
          style={{ padding: "10px 20px" }}
        >
          <i className="fas fa-search"></i>
        </button>

        <SearchLoadingSkelleton loading={loading} />

        {search.length > 0 && suggestions.length === 0 && !loading && (
          <div className="search-suggestion-area">
            <div
              className="text-danger text-center"
              style={{ margin: 0, display: "flex", flexDirection: "column" }}
            >
              <Button
                style={{
                  margin: "10px",
                  zIndex: "999",
                  position: "absolute",
                  right: "1rem",
                }}
                variant="success"
                // disabled={LocalSearchInfo !== null ? false : true}
   
                onClick={()=> setSearch("")}
              >
                <i className="fa fa-times  " aria-hidden="true"></i>
              </Button>
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                Sorry, No Product found by - {search}{" "}
              </p>
              {/* <Translate>Sorry, No Product found by</Translate> - {search}{" "} */}

              <p>Please try with another keyword !</p>
            </div>
          </div>
        )}

        {search.length > 0 && suggestions.length > 0 && (
          <div className="search-suggestion-area">
            <Button
              style={{
                margin: "10px",
                zIndex: "999",
                position: "absolute",
                right: "1rem",
              }}
              variant="success"
              // disabled={LocalSearchInfo !== null ? false : true}
              onClick={()=> setSearch("")}
            >
              <i className="fa fa-times  " aria-hidden="true"></i>
            </Button>
            {suggestions.map((searchItem, searchIndex) => (
              <div
                className="search-suggestion-item"
                key={searchIndex}
                // onClick={() => searchClick(searchItem, searchIndex)}
                onClick={() => handleShow(searchItem)}
              >
                {searchItem.image !== null ? (
                  <div className="float-left search-suggestion-item__img-box">
                    <img src={searchItem.image} alt="" width={50} />
                  </div>
                ) : (
                  <div className="float-left">
                    <img
                      src="/images/default/fallback-image.png"
                      alt=""
                      width={50}
                    />
                  </div>
                )}

                <div className="float-left search-suggestion-item__info">
                  <h5 className="search-title search-suggestion-item__title">
                    {searchItem.is_category ? "Category - " : ""}
                    {searchItem.name}
                  </h5>
                  {searchItem.search_price > 0 && (
                    <p className="search-price search-suggestion-item__search-price">
                      ৳ {searchItem.regular_price}
                    </p>
                  )}
                </div>

                <div className="clearfix"></div>
              </div>
            ))}
          </div>
        )}
      </form>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-5">
            <img src={data.image} height="300" width="300" alt=""/>
            <h4>{data.name}</h4>
            <h5>Price : {data.regular_price}</h5>
            <p>Stock : {data.stock}</p>

            {/* <CartQuantityForDetails
              item={data}
              cart={cart}
              quantity={cartQuantity}
              setQuantity={setQuantity}
            /> */}
            <div className="d-flex justify-content-between align-items-center">
              <PriceCalculation item={data} />

              {typeof filterCarts !== "undefined" && filterCarts !== null ? (
                <CartQuantity cart={filterCarts} />
              ) : (
                <div className="product_cart_btn" onClick={() => addToCart()}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add
                </div>
              )}
            </div>
          </div>

          <div
            className="d-flex justify-content-end"
            onClick={() => addToCart()}
          ></div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchInput;
