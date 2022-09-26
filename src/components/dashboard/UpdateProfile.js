import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeProfileUpdatedInput, updateUserInformation } from './_redux/action/UserAction';
import Message from './../master/message/Message';
import SmallLoading from '../master/simpleLoading/SmallLoading';

const UpdateProfile = ({ handleClose }) => {

    const dispatch = useDispatch();

    const { register, errors, handleSubmit } = useForm();
    const updateProfileInput = useSelector((state) => state.UserReducer.updateProfileInput);
    const isUpdating = useSelector((state) => state.UserReducer.isUpdating);


    const handleLoginInputChange = (name, value) => {
        dispatch(handleChangeProfileUpdatedInput(name, value));
    };

    const onSubmit = data => {
        dispatch(updateUserInformation(updateProfileInput, handleClose))
    };

    return (
        <div className="profile-edit-container">
            <div className="head text-center">
                <h4 className="title">Edit Your Profile</h4>
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
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Jhone Doe"
                                ref={register({ required: true })}
                                value={updateProfileInput.name}
                                onChange={(e) =>
                                    handleLoginInputChange("name", e.target.value)
                                }
                            />
                            {errors.name && <Message text="Name can't be blank !" />}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-item">
                            <label>Your Mobile</label>
                            <input
                                type="number"
                                name="mobile"
                                placeholder="+8801*********"
                                ref={register({ required: true })}
                                value={updateProfileInput.mobile}
                                onChange={(e) =>
                                    handleLoginInputChange("mobile", e.target.value)
                                }
                            />
                            {errors.mobile && <Message text="Mobile can't be blank !" />}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="input-item">
                            <label>Your Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="ma@...."
                                ref={register({ required: false })}
                                value={updateProfileInput.phone}
                                onChange={(e) =>
                                    handleLoginInputChange("email", e.target.value)
                                }
                            />
                            {/* {errors.mobile && <Message text="Mobile can't be blank !" />} */}
                        </div>
                    </div>
                    

                    <div className="col-md-12">
                        <div className="input-item">
                            <label>White About Your Self</label>
                            <textarea placeholder="Say about your self....."></textarea>
                        </div>
                    </div>
                    <div className="col-md-12 d-flex">
                        {
                            isUpdating && (
                                <div>
                                    <button type="button" className="updating_btn not_allowed d-flex justify-content-center" disabled={true}>
                                        <span> <SmallLoading width="20px" height="20px" color="#fff" type="spokes" /> </span>
                                        <div className="ml-3">Saving...</div>
                                    </button>
                                </div>
                            )
                        }
                        {
                            !isUpdating && (
                                <button type="submit" className="submit">Save</button>
                            )
                        }
                        <button onClick={() => handleClose()} className="cencel ml-2" type="button">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;