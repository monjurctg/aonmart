import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getDistrict, getDivision, getUpzila } from '../master/location/_redux/acition/LocationAction';
import SmallLoading from '../master/simpleLoading/SmallLoading';
import { addNewAddress, handleChangeAddressInput } from './_redux/action/UserAction';

const EditAddress = ({ handleClose }) => {

    const dispatch = useDispatch();

    const { register, errors, handleSubmit, setValue } = useForm();
    const newAddressInput = useSelector((state) => state.UserReducer.newAddressInput);
    const divisionList = useSelector((state) => state.LocationReducer.divisionList);
    const districtList = useSelector((state) => state.LocationReducer.districtList);
    const upzilaList = useSelector((state) => state.LocationReducer.upzilaList);
    const loadingDistrict = useSelector((state) => state.LocationReducer.loadingDistrict);
    const loadingUpzila = useSelector((state) => state.LocationReducer.loadingUpzila);
    const addingNewAddress = useSelector((state) => state.UserReducer.addingNewAddress);

    const handleLoginInputChange = (name, value) => {
        dispatch(handleChangeAddressInput(name, value));
        // dispatch(getDivision())
    };

    const onSubmit = data => {
        dispatch(addNewAddress(newAddressInput, handleClose))
    };

    useEffect(() => {
        dispatch(getDivision())
    }, [])

    const isDefault = [
        { label: "True", value: 'true' },
        { label: "False", value: 'false' },
    ]


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
                            <label>Division</label>
                            <RHFInput
                                as={<Select options={divisionList} />}
                                placeholder="Select Location"
                                rules={{ required: true }}
                                name="division_id"
                                className="address_Input"
                                register={register}
                                value={newAddressInput.division_id}
                                onChange={(option) => {
                                    handleLoginInputChange("division_id", option.value);
                                    // handleLoginInputChange("division_name", option.label);
                                    dispatch(getDistrict(option.value));
                                    // dispatch(getDivision());
                                }}
                                setValue={setValue}
                            />

                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-item">
                            <label className="d-flex justify-content-between">
                                <span>City</span>
                                <span>
                                    {
                                        loadingDistrict === true && (
                                            <SmallLoading width="20px" height="20px" />
                                        )
                                    }
                                </span>
                            </label>
                            <RHFInput
                                as={<Select options={districtList} />}
                                placeholder="Select Location"
                                rules={{ required: true }}
                                name="district_id"
                                className="address_Input"
                                register={register}
                                value={newAddressInput.district_id}
                                onChange={(option) => {
                                    handleLoginInputChange("district_id", option.value);
                                    // handleLoginInputChange("district_name", option.label);
                                    dispatch(getDivision());
                                    dispatch(getUpzila(option.value));
                                }}
                                setValue={setValue}
                            />

                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-item">
                            <label className="d-flex justify-content-between">
                                <span>Upzela</span>
                                <span>
                                    {
                                        loadingUpzila === true && (
                                            <SmallLoading width="20px" height="20px" />
                                        )
                                    }
                                </span>
                            </label>
                            <RHFInput
                                as={<Select options={upzilaList} />}
                                placeholder="Select Location"
                                rules={{ required: true }}
                                name="upazila_id"
                                className="address_Input"
                                register={register}
                                value={newAddressInput.upazila_id}
                                onChange={(option) => {
                                    handleLoginInputChange("upazila_id", option.value);
                                    // handleLoginInputChange("upazila_name", option.label);
                                    dispatch(getDivision());
                                }}
                                setValue={setValue}
                            />

                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-item">
                            <label>Your Mobile</label>
                            <input
                                type="number"
                                name="mobile"
                                placeholder="+8801........"
                                ref={register({ required: false })}
                                value={newAddressInput.mobile}
                                onChange={(e) =>
                                    handleLoginInputChange("mobile", e.target.value)
                                }
                            />
                            {/* {errors.mobile && <Message text="Mobile can't be blank !" />} */}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-item">
                            <label>Address</label>
                            <textarea
                                className="address_Input"
                                name="address"
                                onChange={(e) => handleLoginInputChange("address", e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* <div className="col-md-12">
                        <div className="input-item">
                            <label>Is Default? </label>
                            <RHFInput
                                as={<Select options={isDefault} />}
                                placeholder="Select Default Value"
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
                    </div> */}

                    <div className="col-md-12 d-flex">
                        {/* <button type="submit" className="submit">Save</button> */}
                        {
                            addingNewAddress === true && (
                                <div>
                                    <button type="button" className="updating_btn not_allowed d-flex justify-content-center" disabled={true}>
                                        <span> <SmallLoading width="20px" height="20px" color="#fff" type="spokes" /> </span>
                                        <div className="ml-3">Saving...</div>
                                    </button>
                                </div>
                            )
                        }
                        {
                            addingNewAddress === false && (
                                <button type="submit" className="submit">Save</button>
                            )
                        }
                        <button type="button" className="cencel ml-2" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditAddress;