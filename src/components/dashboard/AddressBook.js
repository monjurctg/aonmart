import React, { useEffect, useMemo, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import SimpleModel from "../master/simpleModal/SimpleModel";
import PaginationComponent from "./../master/paginationComponent/PaginationComponent";
import SimpleLoading from "./../master/simpleLoading/SimpleLoading";
import AddressAdd from "./AddressAdd";
import EditAddress from "./EditAddress";
import { getAllAdderss, handleDeleteAddress } from "./_redux/action/UserAction";

const AddressBook = ({ address_title = null }) => {
  const dispatch = useDispatch();
  const [addressModal, setAddressModal] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const addressList = useSelector((state) => state.UserReducer.addressList);
  const loadingAddress = useSelector(
    (state) => state.UserReducer.loadingAddress
  );

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handleShowAddressModal = () => {
    setAddressModal(true);
  };
  const handleShowEditAddressModal = () => {
    setEditAddressModal(true);
  };
  const handleClose = () => {
    setAddressModal(false);
    setEditAddressModal(false);
  };

  useEffect(() => {
    dispatch(getAllAdderss());
  }, []);

  const sliceAddress = useMemo(() => {
    let computedPosts = addressList;
    setTotalItems(computedPosts.length);
    return computedPosts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [addressList, currentPage]);

  const deleteAddress = (address) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure to delete ${address.address} Bangladesh`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(handleDeleteAddress(address.id)),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const activeAddress = addressList.find((item) => item.is_default === true);

  return (
    <React.Fragment>
      <div className="dashboard-body">
        <div className="profile-address-book">
          <h3 className="title custom_user_addess_flex d-flex justify-content-between align-items-center">
            
            <div>{address_title !== null ? address_title : "Address Book"}</div>
            <div
              onClick={() => handleShowAddressModal()}
              title="Add New Address"
              id="edit"
              className="edit pointer"
              data-toggle="modal"
              data-target="#edit-form1"
            >
              <i className="fas fa-edit"></i>
            </div>
          </h3>

          <ul className="address-list">
            {typeof addressList !== "undefined" &&
              addressList !== null &&
              addressList.length > 0 &&
              sliceAddress.map((address, index) => (
                <li
                  className={
                    "active"
                  }
                  //activeAddress.is_default === address.is_default && 
                >
                  <span className="icon">
                    <i className="fas fa-check-circle"></i>
                  </span>
                  <div className="address-text">
                    {/* <h6>Office</h6> */}
                    <div className="address">
                      <h5>
                      {address.address},
                        </h5><p className="country">Bangladesh</p>
                      {/* , {address?.upazila}, {address?.district},{" "}
                      {address?.division} */}
                    </div>
                  </div>
                  <div className="edit-delete-btn">
                    <button
                      className="edit"
                      type="button"
                      data-toggle="modal"
                      data-target="#address-edit"
                      onClick={() => handleShowEditAddressModal()}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteAddress(address)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </li>
              ))}

            {sliceAddress.length > 5 && (
              <PaginationComponent
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}

            {loadingAddress === true && (
              <div className="p-3">
                <SimpleLoading type="spokes" />
              </div>
            )}
          </ul>
        </div>
      </div>
      <SimpleModel
        show={addressModal}
        size="md"
        handleClose={handleClose}
        onHide={handleClose}
        isCloseButton={true}
      >
        <AddressAdd handleClose={handleClose} />
      </SimpleModel>

      <SimpleModel
        show={editAddressModal}
        size="md"
        handleClose={handleClose}
        onHide={handleClose}
        isCloseButton={true}
      >
        <EditAddress handleClose={handleClose} />
      </SimpleModel>
    </React.Fragment>
  );
};

export default AddressBook;
