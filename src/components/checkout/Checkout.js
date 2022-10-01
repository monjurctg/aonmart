// new
import { default as axios, default as Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "../cart/CartItem";
import AddressBook from "../dashboard/AddressBook";
import { getAllAdderss } from "../dashboard/_redux/action/UserAction";
import { getLocalSearchInfo } from "../Location&Store/_redux/action/Location&StoreAction";
import { showToast } from "../master/Helper/Notification";
import { getCartsAction } from "./../cart/_redux/action/CartAction";
import * as Types from "./_redux/Type/Types";

let baseURL = process.env.REACT_APP_API_URL;

// new

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { carts, totalPrice } = useSelector((state) => state.CartReducer);
  const addressList = useSelector((state) => state.UserReducer.addressList);
  // console.log("addressList", addressList);
  const [methodsPayment, setmethodsPayment] = useState();
  // console.log('object :>> ', methodsPayment);
  const [requestedFrom, setrequestedFrom] = useState();

  const isPlacedLoading = useSelector(
    (state) => state.CheckoutReducer.isLoading
  );
  const LocalSearchInfo = useSelector(
    (state) => state.LocationStoreReducer.LocalSearchInfo
  );

  const defaultAddress = addressList.find((item) => item.is_default === true);
  // console.log("defaultAddressafsdfdsfsdfsd", defaultAddress);

  const [defaultAddressID, setDefaultAddressID] = useState(0);
  const [paymentMethod, setpaymentMethod] = useState(2);
  // console.log("paymentMethod", paymentMethod);

  // console.log('setrequestedFrom', requestedFrom)

  const updateCards = JSON.stringify(carts);

  let orderData = {
    store_id: LocalSearchInfo.store.value,
    total: totalPrice,
    details: updateCards,
    address_id: defaultAddressID,
    payment_method: paymentMethod,
    requested_from: requestedFrom,
  };

  useEffect(() => {
    if (typeof defaultAddress !== "undefined" && defaultAddress !== null) {
      setDefaultAddressID(defaultAddress.id);
    }
  }, [defaultAddress]);

  useEffect(() => {
    dispatch(getCartsAction());
    dispatch(getAllAdderss());
    dispatch(getLocalSearchInfo());
    getData();
    detectDevice();
  }, []);

  let detectDevice = async () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setrequestedFrom(2);
    } else {
      setrequestedFrom(1);
    }
  };

  let getData = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    if (
      typeof access_token !== "undefined" &&
      access_token !== null &&
      access_token !== ""
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      };

      let url = `${baseURL}/payment-methods`;
      let res = await axios.get(url, config);
      if (res.status === 200) {
        setmethodsPayment(res.data.data);
      }
      // console.log('res', res)
    }
  };

  let methods = <h4>Loading.....</h4>;
  if (methodsPayment) {
    // console.log('methodsPayment', methodsPayment)
    methods = methodsPayment.map((methods, index) => (
      <option key={index} value={methods.key} selected={methods.key == 2}>
        {methods.title}
      </option>
    ));
  }
  const handlePlaceOrder = () => {
    if (typeof LocalSearchInfo !== "undefined" && LocalSearchInfo !== null && orderData.address_id !== 0) {
      //  dispatch(placeOrder(orderData));
      // new

      let response = {
        isLoading: true,
        status: false,
      };

      const access_token = JSON.parse(localStorage.getItem("access_token"));

      if (
        typeof access_token !== "undefined" &&
        access_token !== null &&
        access_token !== "" 
      ) {
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        };

        try {

          // console.log(orderData);
          Axios.post(`${baseURL}/orders`, orderData, config)
            .then((res) => {
              // console.log('res', res)
              if (res.status) {
                showToast("success", "Your order is placed. Thank You");
                let id = res.data.data.id;
                dispatch({ type: Types.PLACE_ORDER, payload: response });
                history.push(`/order/order-details/${id}`);
                localStorage.setItem("orderData", JSON.stringify(res));
                dispatch({ type: "DELETE_CARTS_DATA" });
                localStorage.removeItem("carts");
              }
            })
            .catch((error) => {
              let responseLog = error.response;
              // console.log('error', responseLog)
              if (typeof responseLog !== "undefined") {
                const { request, ...errorObject } = responseLog;
                if (responseLog.status === 406) {
                  showToast("error", "Please select a payment method");

                  // let errors = Object.values(responseLog?.data?.errors) || [];
                  // console.log('error', error)
                  // if (errors.length > 0) {
                  //   errors.forEach((element) => {
                  //     // console.log("element", element[0]);
                  //     showToast("error", element[0]);
                  //   });
                  // }
                } else if (responseLog.status === 500) {
                  // console.log('firssadat', responseLog.data)

                  showToast("error", responseLog.data.message);
                }
                dispatch({ type: Types.PLACE_ORDER, payload: responseLog });
              }
            });
        } catch (error) {
          response.isLoading = false;
          showToast("error", "Network Error, Please Fix this !");
        }
      } else {
        showToast("error", "Enter your address");
      }
    }else{
      showToast("error", "Enter your address");
    }
  };

  return (
    <React.Fragment>
      <div className="dashboard-section">
        <div className="container">
          <div className="row">
            {/** Checkout onetime password & number validation section */}
            <div className="col-xl-8 col-12">
              {/* <div className="form-item contact-number-item bg-color-white box-shadow p-3 p-lg-5 border-radius5">
                                <h6>Contact Number</h6>
                                <p>We need your phone number so we can inform you about any delay or problem.<br />5 digits code send your phone <strong>+111223366548</strong></p>

                                <div className="mb-2">
                                    <form className="send-code-form">
                                        <input type="text" name="code" />
                                        <button className="submit" type="submit">Send Code</button>
                                    </form>
                                </div>

                                <div>
                                    <h6>Enter Code</h6>
                                    <form className="varify-code-form">
                                        <input type="text" name="code" />
                                        <input type="text" name="code" />
                                        <input type="text" name="code" />
                                        <input type="text" name="code" />
                                        <input type="text" name="code" />
                                        <button className="submit" type="submit">Next</button>
                                        <div>
                                            <a href="/" className="resend-code">Resend Code</a>
                                        </div>
                                    </form>
                                </div>
                            </div> */}

              {/** Checkout onetime password & number validation section close*/}
              {/** Checkout user info input section*/}
              <div className="form-item billing-item border-radius5 user_billing_info">
                {/* <h6>User Accounts</h6>
                                <form action="#" className="billing-form">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="input-item">
                                                <label>Name*</label>
                                                <input type="text" name="name" placeholder="Name" />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-item">
                                                <label>Email*</label>
                                                <input type="text" name="email" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-item">
                                                <label>Mobile*</label>
                                                <input type="text" name="mobile" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="input-item">
                                                <label>Division*</label>
                                                <div className="checkout_billing_info_dropdown">
                                                    <Select
                                                        placeholder="Select Division"
                                                        options={divisionList}
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 4,
                                                            minHeight: "30px",
                                                            colors: {
                                                                ...theme.colors,
                                                                color: "#fff",
                                                                primary25: '#1c733e',
                                                                primary: '#1c733e',
                                                            },
                                                        })}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-item">
                                                <label>Address*</label>
                                                <input type="text" name="address" />
                                                <input type="text" name="address" />
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                <AddressBook address_title="Delivery Address" />
              </div>
              {/** Checkout user info input section close*/}
              {/** Checkout user delivery info start*/}

              <Card>
                <Card.Header style={{ background: "white" }}>
                  <h3
                    className="title custom_user_addess_flex"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginTop: 0,
                      display: "block",
                      // padding: "25px 30px",
                    }}
                  >
                    Delivery Schedule
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <div className="time-schedule-container">
                      {/* <p className="title">Express-Delivery</p> */}
                      <div className="time-schedule-box">
                        {totalPrice !== 0 ? (
                          <div className="time-schedule-container">
                            Usually within 24 hours. Will call to confirm.
                          </div>
                        ) : (
                          history.push("/")
                        )}
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>

              {/** Checkout user delivery info close*/}

              <Card style={{ margin: "14px 0px" }}>
                <Card.Header style={{ background: "white" }}>
                  <h3
                    className="title custom_user_addess_flex"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginTop: 0,
                      display: "block",
                      // padding: "25px 30px",
                    }}
                  >
                    Payment
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <select
                      className="payment-select"
                      onChange={(e) => {
                        setpaymentMethod(e.target.value);
                      }}
                      name="payment_method"
                    >
                      <option disabled>Payment methods</option>
                      {methods}
                    </select>
                    <div className="text-right my-3">
                      <button
                        className="place_order_btn"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            {/** Checkout page cart section */}
            <div className="col-xl-8 col-12">
              <div className="bg-color-white box-shadow border-radius5">
                {typeof carts !== "undefined" &&
                  carts.length > 0 &&
                  carts.map((item, index) => (
                    <CartItem
                      item={item}
                      isRemovable={false}
                      child_style="child_style"
                      isUpgrade={false}
                    />
                  ))}

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
                      <span>Delivery fee</span>
                      <span>50 Tk</span>
                    </p>
                    <p className="total-price d-flex justify-content-between">
                      <span>Total</span>
                      <span>{totalPrice + 50} Tk</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/** Checkout page cart section close*/}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
