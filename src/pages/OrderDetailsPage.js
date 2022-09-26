import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Invoice from "../components/dashboard/orderList/Invoice";
import { getOrderDetails } from "../components/dashboard/orderList/_redux/action/OrderAction";
import { showToast } from "../components/master/Helper/Notification";
import SimpleLoading from "../components/master/simpleLoading/SimpleLoading";
import SimpleModel from "../components/master/simpleModal/SimpleModel";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";

const OrderDetailsPage = () => {
  const { id } = useParams();
  let baseURL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.OrderReducer.orderDetails);
  const isLoading = useSelector((state) => state.OrderReducer.isLoading);
  const [statusBg, setStatusBg] = useState("deliveredBg");
  const [show, setShow] = useState(false);
  const [feed, setfeed] = useState(false);
  const [content, setcontent] = useState();

  const handleShowInvoice = () => {
    setShow(true);
  };

  const handleShowFeed = () => {
    setfeed(true);
  };
  const handleCloseInvoice = () => {
    setShow(false);
  };

  let feedback = async (id, data) => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const storeId = JSON.parse(localStorage.getItem("storeInformation"));
    // console.log('storeId', storeId.storeID)

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

      // console.log('res', res)

      let res = await axios
        .post(`${baseURL}/stores/${storeId.storeID}/feedback`, data, config)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let responseLog = error.response;
          return responseLog;
        });
      if (res.status === 200) {
        showToast("success", res.data.message);
        setfeed(false);
      } else {
        showToast("error", res.data.message);
      }

      console.log("res", res);
    }
  };
  const submitFeedBack = () => {
    let value = {
      content,
      reference: "ORDER",
      reference_id: id,
    };

    feedback(id, value);
  };

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (typeof orderDetails !== "undefined" && orderDetails !== null) {
      if (orderDetails.order_status === "Delivered") {
        setStatusBg("deliveredBg");
      } else if (orderDetails.order_status === "Processing") {
        setStatusBg("on_processing");
      } else {
        setStatusBg("cancelled");
      }
    }
  }, [orderDetails]);

  return (
    <DashboardLayout>
      <React.Fragment>
        {typeof orderDetails !== "undefined" &&
          orderDetails !== null &&
          orderDetails !== "" && (
            <div className="order-card mb-3 show">
              <div className="order-card-header d-flex justify-content-between align-items-center">
                <span className={`order_status ${statusBg}`}>
                  {orderDetails.order_status}
                </span>
                <span className="date">
                  <i className="far fa-clock"></i> 09/21/2021
                </span>
              </div>
              <div className="order-card-body">
                <table>
                  <thead>
                    <tr>
                      <th className="text-center">Orders:</th>
                      <th className="text-center">Items:</th>
                      <th className="text-right">Total Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">#{orderDetails.order_no}</td>
                      <td className="text-center">
                        {orderDetails.details.length} Items
                      </td>
                      <td className="text-right">
                        TK {orderDetails.total + 50}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="order-info-extra mt--20">
                  {orderDetails.details.length > 0 &&
                    orderDetails.details.map((order, index2) => (
                      <div className="product_order_sub_container">
                        <div className="row">
                          <div className="col-md-2 text-center">
                            <h6>Image</h6>z
                            <ul>
                              <li>
                                <img
                                  src={order.image}
                                  alt={order.name}
                                  className="img-fluid"
                                />
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-2 text-center">
                            <h6>Product Id</h6>
                            <ul>
                              <li>{order.product_id}</li>
                            </ul>
                          </div>
                          <div className="col-md-5 text-center">
                            <h6>Name</h6>
                            <ul>
                              {/* <li> Product ID : {order.product_id}</li> */}
                              <li> {order.name}</li>
                              {/* <li>
                                <img
                                  src={order.image}
                                  alt={order.name}
                                  className="img-fluid"
                                />
                              </li> */}
                            </ul>
                          </div>
                          <div className="col-md-2 text-center">
                            <h6>Quantity</h6>
                            <ul>
                              <li>{order.qty}</li>
                            </ul>
                            {/*  */}
                          </div>
                          <div className="col-md-1">
                            <h6>Price</h6>
                            <ul>
                              <li className="text-center">{order.price}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="d-flex justify-content-end mt-3">
                    {!feed ? (
                      <>
                        <button
                          className="review"
                          onClick={() => handleShowInvoice()}
                        >
                          Invoice
                        </button>

                        <button
                          className="review"
                          onClick={() => handleShowFeed()}
                        >
                          Feedback
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type={"text"}
                          className="orderCancle"
                          name="content"
                          onChange={(e) => setcontent(e.target.value)}
                        />
                        <button className="review" onClick={submitFeedBack}>
                          Feedback
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* <div class="order-card-footer">
                                <div class="text-center pointer" onClick={() => setHideMoreDetails(!hideMoreDetails)} >
                                    <span class="view">
                                        {
                                            hideMoreDetails === false ? "View More" : "Show Less"
                                        }
                                    </span>
                                </div>
                            </div> */}
            </div>
          )}
        <div className="order-card">
          {isLoading && (
            <div className="p-3">
              <SimpleLoading type="spokes" />
            </div>
          )}
        </div>
        <SimpleModel
          show={show}
          handleClose={handleCloseInvoice}
          size="lg"
          onHide={() => handleCloseInvoice}
        >
          <Invoice
            handleClose={handleCloseInvoice}
            orderDetails={orderDetails}
          />
        </SimpleModel>
      </React.Fragment>
    </DashboardLayout>
  );
};

export default OrderDetailsPage;
