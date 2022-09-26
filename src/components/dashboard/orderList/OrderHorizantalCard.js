import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showToast } from "../../master/Helper/Notification";
import SimpleLoading from "../../master/simpleLoading/SimpleLoading";
import { orderlistByStatus } from "./_redux/action/OrderAction";

const OrderHorizantalCard = ({ status }) => {
  // console.log('status', status)
  const dispatch = useDispatch();
  let baseURL = process.env.REACT_APP_API_URL;
  const [hideMoreDetails, setHideMoreDetails] = useState(false);
  const [statusBg, setStatusBg] = useState("deliveredBg");
  const [cancle, setCancle] = useState(false);
  const [cancleId, setcancleId] = useState();
  const [reason, setreason] = useState();
  const [password, setpassword] = useState();

  const orderList = useSelector((state) => state.OrderReducer.orderList);
  const isLoading = useSelector((state) => state.OrderReducer.isLoading);

  let cancelOrder = async (id, data) => {
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

      // console.log('res', res)

      let res = await axios
        .post(`${baseURL}/orders/${id}/cancel`, data, config)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let responseLog = error.response;
          return responseLog;
        });
      if (res.status === 200) {
        showToast("success", res.data.message);
        dispatch(orderlistByStatus(0));
      }else{
            showToast(
            "error",
            res.data.message
          );
          
      }

      console.log("res", res);
    }
  };

  let cancelOrderValues = (data) => {
    setCancle(!cancle);
    setcancleId(data);
    let value = {
      id: cancleId,
      reason,
    };
    if (value.reason) {
      cancelOrder(cancleId, value);
    }
    // console.log('value', value)
  };

  // console.log("cancle", cancle);

  useEffect(() => {
    if (status === "Delivered") {
      setStatusBg("deliveredBg");
    } else if (status === "On Progress") {
      setStatusBg("on_processing");
    } else {
      setStatusBg("cancelled");
    }
  }, [status]);

  useEffect(() => {
    dispatch(orderlistByStatus(0));
  }, []);

  return (
    <React.Fragment>
      {typeof orderList !== "undefined" &&
        orderList.length > 0 &&
        orderList.map((item, index) => (
          <div
            className={
              hideMoreDetails === true
                ? "order-card mb-3 show"
                : "order-card mb-3"
            }
            key={index + 1}
          >
            <div className="order-card-header d-flex justify-content-between align-items-center ">
              <span className={`order_status ${statusBg}`}>{item.order_status}</span>
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
                    <th className="text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">#{item.order_no}</td>
                    <td className="text-center">{item.details.length} Items</td>
                    <td className="text-right">TK {item.total}</td>
                  </tr>
                </tbody>
              </table>
              <div className="order-info-extra mt--20">
                {item.details.length > 0 &&
                  item.details.map((order, index2) => (
                    <div className="product_order_sub_container">
                      <div className="row">
                        {/* <div className="col-md-4">
                      <h6>Product Imagessss</h6>
                          <img
                            src={order.image}
                            alt={order.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-4">
                          <h6>Product Details</h6>
                          <ul>
                            <li> Product ID : {order.product_id}</li>
                            <li> Product Name: {order.name}</li>
                            
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h6>Price & Quantity</h6>
                          <li> Quantity : {order.qty}</li>
                          <li> Price: {order.price}</li>
                        </div> */}
                        <div className="col-md-2 text-center">
                          <h6>Image</h6>
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
                  {!cancle ? (
                    <>
                      <Link
                        to={`/order/order-details/${item.id}`}
                        // to={`/order/order-details/${item.order_no}`}
                        className="order-detail"
                      >
                        Order Details
                      </Link>
                      <a className="review" href="#">
                        Review
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                  {cancle && cancleId === item.id ? (
                    <>
                      <input
                        type="text"
                        className="mx-3 orderCancle"
                        placeholder={"Please enter reason"}
                        name="reason"
                        onChange={(e) => setreason(e.target.value)}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  {item.order_status === "Processing" ? (
                    <button
                      onClick={() => cancelOrderValues(item.id)}
                      className="order-detail cancelled ml-3"
                      style={{ BackGround: "#f76037 !important" }}
                    >
                      Cancel Order
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="order-card-footer">
              <div
                className="text-center pointer"
                onClick={() => setHideMoreDetails(!hideMoreDetails)}
              >
                <span className="view">
                  {hideMoreDetails === false ? "View More" : "Show Less"}
                </span>
              </div>
            </div>
          </div>
        ))}
      <div className="order-card">
        {isLoading && (
          <div className="p-3">
            <SimpleLoading type="spokes" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderHorizantalCard;
