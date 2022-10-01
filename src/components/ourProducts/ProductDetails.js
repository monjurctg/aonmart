/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartQuantityForDetails from "../cart/partials/CartQuantityForDetails";
import {
  addToCartAction,
  getCartsAction
} from "../cart/_redux/action/CartAction";
import PriceCalculation from "../master/services/PriceCalculcation";
import SimpleButton from "../master/simpleButton/SimpleButton";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import { getProductDetails } from "./_redux/Action/OurProductAction";

const ProductDetails = ({ product, id, screenWidthValue }) => {
  // const { carts, cartQuantity } = useSelector((state) => state.CartReducer);
  // console.log('filterCartssssssss')

  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) || "";

  const dispatch = useDispatch();
  const history = useHistory();

  const productDetails = useSelector(
    (state) => state.OurProductReducer.productDetails
  );
  const loadingDetails = useSelector(
    (state) => state.OurProductReducer.loadingDetails
  );
  const carts = useSelector((state) => state.CartReducer.carts);
  // console.log('firs cartst', carts)
  // const cartQuantity = useSelector((state) => state.CartReducer.cartQuantity);
  const [filterCarts, setFilterCarts] = useState(null);
  const [quantity, setQuantity] = useState(0);
  // console.log('quantity', quantity)

  const [prevImg, setPrevImg] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(id, storeInformation?.storeID));
    dispatch(getCartsAction());
  }, []);

  useEffect(() => {
    if (productDetails !== null && productDetails !== "") {
      setPrevImg(productDetails.image);
    }
  }, [productDetails]);

  const zoomImg = {
    width: screenWidthValue > 400 ? 400 : 300,
    height: 200,
    zoomWidth: 300,
    zoomPosition: "original",
    img: prevImg,
  };

  useEffect(() => {
    if (productDetails) {
      // console.log('productDetails', productDetails)
      const newFilterCarts = carts.find(
        (item) => item.product_id == productDetails.id
      );
      // console.log('newFilterCarts', newFilterCarts)
      setFilterCarts(newFilterCarts);
      if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
        setQuantity(newFilterCarts.qty);
        // setQuantity(newFilterCarts.quantity);
      }
    }
  }, [loadingDetails, carts, quantity]);

  const addToCart = () => {
    dispatch(addToCartAction(product));
    // if (
    //   typeof carts !== "undefined" &&
    //   carts !== null &&
    //   carts !== "" &&
    //   carts.length > 0
    // ) {
    history.push("/checkout");
    // } else {
    //   showToast("error", "Please update your cart first!");
    //   showToast("error", "Please update your cart first!fghtghnt");
    // psdvcdv
    // }
  };

  return (
    <section className="product_details_area p-5">
      {typeof productDetails !== "undefined" &&
        productDetails !== null &&
        productDetails !== "" && (
          <div className="row">
            <div className="col-lg-12">
              {/* <span className="product_details_batch">30%</span> */}
              <div className="">
                {prevImg !== null && (
                  <>
                    <img src={prevImg} alt="" style={{
                          width: "100%",
                          height: "260px",
                          objectFit: "fill",
                    }}/>
                    {/* <SideBySideMagnifier
                      style={{width: "20px"}}
                      // imageSrc={prevImg}
                      // imageAlt={productDetails.name}
                      // className="product_prev_img"
                      alwaysInPlace={true}
                    />
                    <ReactImageZoom {...zoomImg} /> */}
                  </>
                )}
                {/* <div className="product_details_img_gallery">
                                    <img src={productDetails.image} alt={productDetails.name} />
                    </div> */}
              </div>
            </div>
            <div className="col-lg-12 custom_row">
              <div className="product-details-content">
                {/* <Link className="wish-link" to={``}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                                    </svg>
                                </Link> */}
                <div className="wish_list_add">
                  {/* <AddToWishlist
                    id={productDetails.id}
                    is_in_wishlist={productDetails?.is_in_wishlist}
                  /> */}
                </div>
                {/* <a href="/" className="cata">
                  Catagory
                </a> */}
                <h4 style={{ fontSize: "18px" }}>{productDetails.name}</h4>

                {/* <p className="quantity">1kg</p> */}
                <h3 className="price">
                  <PriceCalculation
                    item={productDetails}
                    style={{ fontSize: "24px" }}
                  />
                </h3>

                <div
                  className="d-flex justify-content-between"
                  style={{ alignItems: "baseline" }}
                >
                  <div>
                    <CartQuantityForDetails
                      item={productDetails}
                      cart={filterCarts}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      stock={productDetails.stock}
                    />
                  </div>

                  <h5
                    style={{
                      fontSize: "20px",
                      margin: "5px 0",
                      color: "white",
                      width: "100px",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "#3f51b5",
                      boxShadow: "1px 1px 1px 1px #9e9e9e",
                    }}
                  >
                    Stock:<span>{productDetails.stock}</span>
                  </h5>
                </div>
                <p>{productDetails.full_description}</p>

                <div
                  className="d-flex justify-content-end"
                  onClick={() => addToCart()}
                >
                  {/* <a href="/" class="buy-now">Buy Now</a> */}
                  <SimpleButton
                    text="Buy Now"
                    style={{ padding: "5px 20px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      {loadingDetails === true && (
        <SimpleLoading type="spokes" color="#1c733e" />
      )}
    </section>
  );
};

export default ProductDetails;
