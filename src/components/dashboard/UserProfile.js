import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import SimpleModel from "../master/simpleModal/SimpleModel";
import AddressAdd from "./AddressAdd";
import UpdateProfile from "./UpdateProfile";
import { getAllAdderss, getUserInformation } from "./_redux/action/UserAction";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [handle, setHandle] = useState(false);

  const [addressModal, setAddressModal] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleBox = () => {
    setHandle(true);
  };
  
  const handleShowAddressModal = () => {
    setAddressModal(true);
  };
  const handleClose = () => {
    setShow(false);
    setAddressModal(false);
  };

  const singleUserInfo = useSelector(
    (state) => state.UserReducer.singleUserInfo
  );
  const isLoading = useSelector((state) => state.UserReducer.isLoading);
  const addressList = useSelector((state) => state.UserReducer.addressList);

  useEffect(() => {
      dispatch(getUserInformation());
  }, [])

  useEffect(() => {
    dispatch(getAllAdderss());
  }, []);

  const conShoppingStyle = {
    width: "100%",
    border: "1px solid #1c733e",
    backgroundColor: "#1c733e",
    padding: "12px 35px",
    marginBottom: "5px",
    color: "white",
    outline: "none",
    borderRadius: "3px",
  }
  
  return (
    <React.Fragment>
      <div className="dashboard-body">
        <div className="profile">
          {typeof singleUserInfo !== "undefined" &&
            singleUserInfo !== null &&
            singleUserInfo !== "" && (
              <>
                <div className="dashboard_body_header">
                  <h5 className="title">
                    Your Profile

                <span
                      title="Edit Profile"
                      id="edit"
                      className="edit d-flex"
                      data-toggle="modal"
                      data-target="#edit-form1"
                    >
                      <i
                        className="fas fa-edit mr-3"
                        onClick={() => handleShow()}
                      ></i>
                        {/* <i
                        className="fas fa-bars d-block d-md-none"
                        onClick={() => handleBox()}
                      ></i> */}
                    </span>
                 
                  </h5>
                </div>

                <ul className="list-profile-info list-unstyled">
                  <li>
                    <span className="title">Your Name</span>
                    <span className="desc text-uppercase">
                      {singleUserInfo.name}
                    </span>
                  </li>
                  <li>
                    <span className="title">Email</span>
                    <span className="desc">{singleUserInfo.email}</span>
                  </li>
                  <li>
                    <span className="title">Mobile</span>
                    <span className="desc">{singleUserInfo.mobile}</span>
                  </li>

                  {typeof addressList !== "undefined" &&
                    addressList !== null &&
                    addressList.length > 0 && (
                      <>
                        <li>
                          <span className="title">City</span>
                          <span className="desc">
                            {addressList[0].district}
                          </span>
                        </li>
                        <li>
                          <span className="title">State</span>
                          <span className="desc">
                            {addressList[0].division}
                          </span>
                        </li>
                        <li>
                          <span className="title">Country</span>
                          <span className="desc">Bangladesh</span>
                        </li>
                      </>
                    )}
                </ul>
                <div className="con-shopping" style={{width:"100%",
    textAlign: "center",
    marginBottom: "2rem",}} >
    {/* // background-color: #1c733e;
    // padding: 12px 35px;
    // margin-bottom: 5px;
    // color: white;
    // outline: none;
    // border-radius: 3px;}}> */}

                <Link to={"/"} style={conShoppingStyle}>Continue Shopping </Link>
                </div>
              </>
            )}
          {isLoading && (
            <div className="p-3">
              <SimpleLoading type="spokes" />
            </div>
          )}
        </div>
      </div>
      <SimpleModel
        show={show}
        size="md"
        handleClose={handleClose}
        onHide={handleClose}
        isCloseButton={true}
      >
        <UpdateProfile handleClose={handleClose} />
      </SimpleModel>
      <SimpleModel
        show={addressModal}
        size="md"
        handleClose={handleClose}
        onHide={handleClose}
        isCloseButton={true}
      >
        <AddressAdd />
      </SimpleModel>
    </React.Fragment>
  );
};

export default UserProfile;
