import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../../assets/images/updateaonmart.png';
import SmallLoading from "../../master/simpleLoading/SmallLoading";
import { toCapitalized } from "../../master/utlits/LetterFormat";
import { getAllAdderss } from "../_redux/action/UserAction";

const Invoice = ({ orderDetails }) => {
  const dispatch = useDispatch();
console.log('orderDetails :>> ', orderDetails);
  function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const singleUserInfo = useSelector(
    (state) => state.UserReducer.singleUserInfo
  );
  const addressList = useSelector((state) => state.UserReducer.addressList);
  const isLoading = useSelector((state) => state.UserReducer.loadingAddress);
  const activeAddress = addressList.find((item) => item.is_default === true);


  useEffect(() => {
    dispatch(getAllAdderss());
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <button
          className="btn btn-success btn-sm btn-print non-printable float-right mt-3 mr-5"
          onClick={() => printDiv("printable-invoice-area")}
        >
          <i className="fas fa-print"></i> Print
        </button>
        <div className="row" id="printable-invoice-area">
          <div className="col-md-12">
            <div className="receipt bg-white p-3 rounded">
              <img src={Logo} width="120" alt="Aonmart" />
              <h4 className="mt-3 mb-3">
                Invoice for Order Number {orderDetails?.order_no}.
              </h4>
              <h6 className="name">
                Hello{" "}
                {typeof singleUserInfo !== "undefined" &&
                  singleUserInfo !== null &&
                  singleUserInfo !== "" &&
                  singleUserInfo.name}
                ,
              </h6>
              <span className="fs-12 text-black-50">
                Your order has been confirmed and under process. We usually
                deliver within 24 hours. Will call to confirm.
              </span>
              <hr />
              <div className="row">
                <div className="col-md-2 col-sm-6">
                  <div>
                    <span className="d-block fs-12">Order date</span>
                    <span className="font-weight-bold">
                      {orderDetails?.processing_at}
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-sm-6">
                <div>
                  <span className="d-block fs-12">Order number</span>
                  <span className="font-weight-bold">
                    #{orderDetails?.order_no}
                  </span>
                </div>
                </div>
                <div className="col-md-4 col-sm-6">
                <div>
                  <span className="d-block fs-12">Payment method</span>
                  <span className="font-weight-bold">Cash on delivery</span>
                  <img
                    className="ml-1 mb-1"
                    src="https://m.economictimes.com/thumb/msid-83058184,width-1200,height-900,resizemode-4,imgsize-47252/cod-istock.jpg"
                    alt=""
                    width="20"
                  />
                </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                  <div>
                  <span className="d-block fs-12">Shipping Address</span>
                  <span className="font-weight-bold text-success">
                    {activeAddress && (
                      <>
                        {activeAddress.address} <br />
                        {activeAddress.upazila}, {activeAddress.division}
                      </>
                    )}
                    {isLoading && (
                      <div className="d-flex">
                        <span>
                          <SmallLoading type="spokes" />
                        </span>
                        <div className="ml-2">Loading...</div>
                      </div>
                    )}
                  </span>
                </div>
                  </div>
              </div>
              {/* <div className="d-flex flex-row justify-content-between  order-details">
                {/* <div>
                  <span className="d-block fs-12">Order date</span>
                  <span className="font-weight-bold">
                    {orderDetails.processing_at}
                  </span>
                </div> */}
                {/* <div>
                  <span className="d-block fs-12">Order number</span>
                  <span className="font-weight-bold">
                    #{orderDetails.order_no}
                  </span>
                </div> */}
                {/* <div>
                  <span className="d-block fs-12">Payment method</span>
                  <span className="font-weight-bold">Cash on delivery</span>
                  <img
                    className="ml-1 mb-1"
                    src="https://m.economictimes.com/thumb/msid-83058184,width-1200,height-900,resizemode-4,imgsize-47252/cod-istock.jpg"
                    alt=""
                    width="20"
                  />
                </div> */}
                {/* <div>
                  <span className="d-block fs-12">Shipping Address</span>
                  <span className="font-weight-bold text-success">
                    {activeAddress && (
                      <>
                        {activeAddress.address} <br />
                        {activeAddress.upazila}, {activeAddress.division}
                      </>
                    )}
                    {isLoading && (
                      <div className="d-flex">
                        <span>
                          <SmallLoading type="spokes" />
                        </span>
                        <div className="ml-2">Loading...</div>
                      </div>
                    )}
                  </span>
                </div> */}
              {/* </div>  */}
              <hr />
              <div className="border shadow-sm">
                {orderDetails?.details?.length > 0 &&
                  orderDetails.details.map((item, index) => (
                    <div className="d-flex justify-content-between align-items-center invoice_product mt-2">
                      <div className="d-flex flex-row product-name-image">
                        {/* <img
                          className="rounded"
                          src={item.image}
                          alt={item.name}
                          width="80"
                        /> */}
                        <div className="d-flex flex-column justify-content-between ml-2">
                          <div>
                            <span className="d-block font-weight-bold p-name">
                              {toCapitalized(item.name)}
                            </span>
                          </div>
                          <span className="fs-12">Qty: {item.qty}pcs</span>
                        </div>
                      </div>
                      <div className="product-price">
                        <h6>{item.price} Tk.</h6>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-5 amount row">
                {/* <div className="d-flex justify-content-center col-md-6 invoices_barcode">
                  <Barcode value={`Order ID = ${orderDetails.order_no}`} />,
                </div> */}
                <div className="col-md-6 offset-md-6">
                  <div className="billing">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <span className="font-weight-bold">
                        {orderDetails?.total} Tk.
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <span>Shipping fee</span>
                      <span className="font-weight-bold">50 Tk.</span>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between mt-1">
                      <span className="font-weight-bold">Total</span>
                      <span className="font-weight-bold text-success">
                        {orderDetails?.total + 50} Tk.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <span className="d-block">Expected delivery date</span> */}
              {/* <span className="font-weight-bold text-success">
                {moment(orderDetails.processing_at)
                  .add(7, "days")
                  .format("dddd, MMMM Do YYYY")}
              </span> */}
              <span className="d-block mt-3 text-black-50 fs-15">
                We will be sending a shipping confirmation email when the item
                is shipped!
              </span>
              <hr />
              <div className="d-flex justify-content-between align-items-center footer">
                <div className="thanks">
                  <span className="d-block font-weight-bold">
                    Thank you for being a Valued Customer of
                  </span>
                  <span>AonMart.net</span>
                </div>
                <div className="d-flex flex-column justify-content-end align-items-end">
                  <span className="d-block font-weight-bold">Need Help?</span>
                  <span>Call - 974493933</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invoice;
