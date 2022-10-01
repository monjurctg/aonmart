import moment from "moment";
import {showToast} from "../../../master/Helper/Notification";
import * as Types from "../types/Types";

// import { showToast } from "../../../master/Helper/ToastHelper";

/**
 * Get all cart items Action
 *
 * @since 1.0.0
 *
 * @returns void Dispatch event `GET_CARTS`
 */
export const getCartsAction = () => async (dispatch) => {
  dispatch({type: Types.GET_CARTS, payload: getCartData()});
};

/**
 * Add to cart Action
 *
 * Handle two cases -
 * 1) First time add to cart
 * 2) Already added item, then again add - Update cart quantity
 *
 * @since 1.0.0
 *
 * @param object product
 * @param object args Additional params when adding cart
 *
 * @returns void Dispatch event `ADD_CART_DATA`
 */
export const addToCartAction =
  (product, args = {}) =>
  async (dispatch) => {
    const carts = getCartData();

    const qty = typeof args["qty"] !== "undefined" ? args["qty"] : 1;

    // console.log(product,"jkjhijih");

    const offerPrice =
      product?.sell_price &&
      product?.sell_price !== 0 &&
      product?.sell_price !== "" &&
      product?.sell_price !== null
        ? product?.sell_price
        : "";

    // Check first if product is already added in the cart, then just update the qty
    let isUpdateToProduct = false;

    carts.forEach((cart, index) => {
      if (cart?.product_id === product?.id) {
        isUpdateToProduct = true;
        cart.qty = cart.qty + qty;
        carts[index] = cart;
      }
    });

    if (!isUpdateToProduct) {
      const cartData = {
        product_id: product?.id,
        product_name: product?.name,
        qty: qty,
        productStock: product?.stock,
        price: product?.regular_price,
        offer_price: offerPrice,
        product_image: product?.image,
        // productImage      : `${process.env.NEXT_PUBLIC_URL}images/products/${product.featured_image}`,
        approxDeliveryTime: moment()
          .add(7, "days")
          .format("dddd, MMMM Do YYYY"),
        sku: product?.sku,
        isChecked: true, // By default item price will be added as checked
        additional: {},
      };

      carts.push(cartData);
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    showToast("success", "Product added to cart");
    dispatch(getCartsAction());
  };

/**
 * Update Cart Qty Action
 *
 * @since 1.0.0
 *
 * @param int productID
 * @param int quantity
 *
 * @return void Dispatch
 */
export const updateCartQtyAction = (product_id, qty) => async (dispatch) => {
  const carts = getCartData();

  if (qty === 0) {
    dispatch(deleteCartItemAction(product_id));
  } else {
    // console.log('qty', qty)

    carts.forEach((cart, index) => {
      // console.log('art.product_id === product_id', product_id)
      if (cart.product_id === product_id) {
        console.log("cart", cart);
        cart.qty = qty;
        carts[index] = cart;
      }
    });

    localStorage.setItem("carts", JSON.stringify(carts));
    showToast("success", "Carts Item Updated !");
  }

  dispatch(getCartsAction());
};

/**
 * Toggle all carts are selected or deselected
 *
 * @since 1.0.0
 *
 * @param boolean checked
 * @param int     productID
 * @param int     sellerID
 *
 * @return void
 */
export const toggleAllCartSelection =
  (checked = true, productID = null, sellerID = null) =>
  (dispatch) => {
    const carts = getCartData();

    if (productID === null) {
      if (sellerID === null) {
        carts.forEach((cart, index) => {
          cart.isChecked = checked;
          carts[index] = cart;
        });
      } else {
        carts.forEach((cart, index) => {
          if (cart.sellerID === sellerID) {
            cart.isChecked = checked;
            carts[index] = cart;
          }
        });
      }
    } else {
      carts.forEach((cart, index) => {
        if (cart.productID === productID) {
          cart.isChecked = checked;
          carts[index] = cart;
        }
      });
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    dispatch(getCartsAction());
  };

/**
 * Delete carts data
 *
 * @since 1.0.0
 *
 * @params int productID
 *
 * @return void Delete from localstorage by `productID`
 */
export const deleteCartItemAction = (product_id) => async (dispatch) => {
  const carts = getCartData().filter((cart) => cart.product_id !== product_id);
  localStorage.setItem("carts", JSON.stringify(carts));
  showToast("success", "Remove item from cart!");
  dispatch(getCartsAction());
};

/**
 * Get Supplier wise formatted carts data
 *
 * @since 1.0.0
 *
 * @return array Supplier Wise Carts based on `sellerID` params
 */
export const getSupplierWiseCartsData = () => {
  const data = getCartData().reduce(function (results, cartItem) {
    (results[cartItem.sellerID] = results[cartItem.sellerID] || []).push(
      cartItem
    );
    return results;
  }, {});

  const supplierWiseCarts = [];

  Object.keys(data).forEach((index) => {
    const supplierWiseItem = data[index];

    let singleSupplierCart = {
      isChecked: supplierWiseItem.every((item) => item.isChecked === true),
      data: supplierWiseItem,
      sellerID:
        supplierWiseItem.length > 0 ? supplierWiseItem[0]["sellerID"] : null,
      sellerName:
        supplierWiseItem.length > 0 ? supplierWiseItem[0]["sellerName"] : null,
      approxDeliveryDate:
        supplierWiseItem.length > 0
          ? supplierWiseItem[0]["approxDeliveryDate"]
          : null,
    };

    supplierWiseCarts.push(singleSupplierCart);
  });

  return supplierWiseCarts;
};

/**
 * Get Formatted carts data
 *
 * @since 1.0.0
 *
 * @returns array Formatted Carts data as array
 */
const getCartData = () => {
  let carts = localStorage.getItem("carts") || "";

  if (typeof carts !== "undefined" && carts !== null && carts !== "") {
    carts = JSON.parse(carts) || [];
  }

  if (Array.isArray(carts)) {
    carts.forEach((cart, index) => {
      cart.approxDeliveryDate = getDeliveryDateFromTime(
        cart.approxDeliveryTime
      );
      carts[index] = cart;
    });
    return carts;
  }

  return [];
};

/**
 * getDeliveryDateFromTime
 *
 * @since 1.0.0
 *
 * @param float approxDeliveryTime
 *
 * @return string approxDeliveryDate
 */
export const getDeliveryDateFromTime = (approxDeliveryTime) => {
  const duration = moment.duration(approxDeliveryTime, "minutes");

  return moment().add(duration.days(), "days").format("dddd, MMMM Do YYYY");
};

/**
 * removeAllCartItem
 *
 * @since 1.0.0
 *
 * @return void
 */
export const removeAllCartItem = () => async (dispatch) => {
  const cart = [];
  localStorage.setItem("carts", JSON.stringify(cart));
  dispatch(getCartsAction());
};

/**
 * quantity
 *
 * @since 1.0.0
 *
 * @return void
 */

export const handleQuantity = (quantity) => async (dispatch) => {
  dispatch({type: Types.HANDLE_QUANTITY, payload: quantity});
};

// new

export const deleteCartsData = () => async (dispatch) => {
  dispatch({type: Types.DELETE_CARTS_DATA});
};
