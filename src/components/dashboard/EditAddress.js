import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getDivision } from "../master/location/_redux/acition/LocationAction";
import SmallLoading from "../master/simpleLoading/SmallLoading";
import {
    addNewAddress,
    handleChangeAddressInput
} from "./_redux/action/UserAction";

const EditAddress = ({ address, handleClose }) => {
  console.log("address :>> ", address);
  const dispatch = useDispatch();
  const [addressNow, setaddressNow] = useState(address?.address);

  const { register, errors, handleSubmit, setValue } = useForm();
  const newAddressInput = useSelector(
    (state) => state.UserReducer.newAddressInput
  );
  const addingNewAddress = useSelector(
    (state) => state.UserReducer.addingNewAddress
  );

  const handleLoginInputChange = (name, value) => {
    dispatch(handleChangeAddressInput(name, value));
    // dispatch(getDivision())
  };

  const onSubmit = (data) => {
    dispatch(addNewAddress(newAddressInput, handleClose, "update"));
  };

  useEffect(() => {
    dispatch(getDivision());
  }, []);

  const isDefault = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="input-item">
              <label>Address</label>
              <textarea
                className="address_Input"
                name="address"
                value={addressNow}
                onChange={(e) => {
                  setaddressNow(e.target.value);
                  handleLoginInputChange("address", e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="col-md-12">
            <div className="input-item">
              <label>Is this your default address? </label>
              <RHFInput
                as={<Select options={isDefault} />}
                placeholder="Select Default Address"
                rules={{ required: true }}
                name="is_default"
                className="address_Input"
                register={register}
                value={newAddressInput.is_default}
                onChange={(option) => {
                  handleLoginInputChange("is_default", option.value);
                }}
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
                  disabled={true}
                >
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
