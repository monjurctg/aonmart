import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
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
  const [selectedData, setselectedData] = useState(null);
  const [feed, setfeed] = useState(false);
  const [fId, setfId] = useState(null);
  const [content, setcontent] = useState();

  const handleShowInvoice = (data) => {
    setselectedData(data);
    setShow(true);
  };

  const handleShowFeed = (id) => {
    setfId(id);
    setfeed(true);
  };

  const handleCloseFeed = () => {
    setfeed(false);
  };
  const handleCloseInvoice = () => {
    setShow(false);
    setselectedData(null);
  };

  let feedback = async (data) => {
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
        setfId(null);
      } else {
        showToast("error", res.data.message);
      }

      // console.log("res", res);
    }
  };
  const submitFeedBack = () => {
    let value = {
      content,
      reference: "ORDER",
      reference_id: fId,
    };

    feedback(fId, value);
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

  // console.log("orderDetails :>> ", orderDetails);
  let tdata = "";
  if (orderDetails?.length > 0) {
    tdata = orderDetails.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{ fontWeight: "600" }}>#{item.id}</td>
          <td>{item.details[0]?.name}</td>
          <td>
            <p
              style={
                item.order_status === "Processing"
                  ? {
                      background: "#ff9800",
                      borderRadius: "5px",
                      color: "white",
                      padding: "3px 10px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }
                  : {}
              }
            >
              {item.order_status}
            </p>
          </td>
          <td>
            <p
              style={{
                background: "#000",

                color: "white",
                padding: "3px 9px",
                borderRadius: "5px",
              }}
            >
              {item.payment_status}
            </p>
          </td>
          <td>{item.payment_method}</td>
          <td>{item.processing_at}</td>
          <td>{item.delivered_at}</td>
          <td>{item.total}tk</td>
          <td>
            <div className="d-flex justify-content-end mt-3">
              <>
                <button
                  className="review"
                  onClick={() => handleShowInvoice(item)}
                >
                  Invoice
                </button>

                <button
                  className="review"
                  onClick={() => handleShowFeed(item.id)}
                >
                  Feedback
                </button>
              </>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <DashboardLayout>
      <div
        style={{ boxShadow: "1px 1px 13px -4px #9e9e9e", borderRadius: "10px" }}
      >
        <Table responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Method</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tdata}</tbody>
        </Table>
      </div>
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
        <Invoice handleClose={handleCloseInvoice} orderDetails={selectedData} />
      </SimpleModel>
      <SimpleModel
        show={feed}
        handleClose={handleCloseFeed}
        size="lg"
        onHide={() => handleCloseFeed}
      >
        <div
          style={{
            marginTop: "50px",
            width: "258px",
          }}
        >
          <input
            style={{
              width: "100%",
              margin: "14px 0px",
              padding: "5px",
              borderRadius: "5px",
            }}
            type={"text"}
            className="orderCancle"
            name="content"
            placeholder="Write your feedback"
            onChange={(e) => setcontent(e.target.value)}
          />
        </div>
        <button
          className="review"
          style={{
            width: "100%",
            margin: "auto",
          }}
          onClick={submitFeedBack}
        >
          Feedback
        </button>
        {/* <Invoice handleClose={handleCloseInvoice} orderDetails={selectedData} /> */}
      </SimpleModel>
    </DashboardLayout>
  );
};

export default OrderDetailsPage;
