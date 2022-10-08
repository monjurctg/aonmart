import axios from "axios";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {RHFInput} from "react-hook-form-input";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {getDivision} from "../master/location/_redux/acition/LocationAction";
import SmallLoading from "../master/simpleLoading/SmallLoading";
import {
  addNewAddress,
  getAllAdderss,
  handleChangeAddressInput,
} from "./_redux/action/UserAction";

const EditAddress = ({address, handleClose}) => {
  const [editAdress, setEditAdress] = useState({
    address_id: address?.id,
    address: address?.address,
    is_default: address?.is_default,
  });
  const dispatch = useDispatch();

  const {register, errors, handleSubmit, setValue} = useForm();
  const newAddressInput = useSelector(
    (state) => state.UserReducer.newAddressInput
  );
  const addingNewAddress = useSelector(
    (state) => state.UserReducer.addingNewAddress
  );

  const handleLoginInputChange = (e) => {
    setEditAdress({...editAdress, [e.target.name]: e.target.value});
    console.log("");

    // dispatch(getDivision())
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const login_data = JSON.parse(localStorage.getItem("loginData"));

    const access_token = login_data.userData.access_token;
    // const id = login_data.userData.data.id

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    };

    const res = await axios.put("/address-edit", editAdress, config);
    if (res.status === 200) {
      dispatch(getAllAdderss());
      handleClose(true);
    }

    // dispatch(addNewAddress(newAddressInput, handleClose, "update"));
  };

  useEffect(() => {
    dispatch(getDivision());
  }, []);

  const isDefault = [
    {label: "Yes", value: "true"},
    {label: "No", value: "false"},
  ];

  return (
    <div className="address_input_container">
      <div className="head text-center">
        <h4 className="title">Update Your Address</h4>
      </div>
      <form
        className="profile-form"
        autoComplete="off"
        autoSave="off"
        onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="input-item">
              <label>Address</label>
              <textarea
                className="address_Input"
                name="address"
                value={editAdress?.address}
                onChange={handleLoginInputChange}></textarea>
            </div>
          </div>

          <div className="col-md-12">
            <div className="input-item">
              <label>Is this your address? </label>
              <RHFInput
                name="is_default"
                onChange={(e) =>
                  setEditAdress({...editAdress, is_default: e.value ? 1 : 0})
                }
                as={<Select options={isDefault} />}
                placeholder="Select Default Address"
                rules={{required: true}}
                className="address_Input"
                register={register}
                value={editAdress.is_default}
                setValue={setValue}
              />
            </div>
          </div>

          <div className="col-md-12 d-flex">
            {/* <button type="submit" className="submit">Save</button> */}
            {addingNewAddress === true && (
              <div>
                <button
                  type="button"
                  className="updating_btn not_allowed d-flex justify-content-center"
                  disabled={true}>
                  <span>
                    {" "}
                    <SmallLoading
                      width="20px"
                      height="20px"
                      color="#fff"
                      type="spokes"
                    />{" "}
                  </span>
                  <div className="ml-3">Saving...</div>
                </button>
              </div>
            )}
            {addingNewAddress === false && (
              <button type="submit" className="submit">
                Save
              </button>
            )}
            <button type="button" className="cencel ml-2" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
