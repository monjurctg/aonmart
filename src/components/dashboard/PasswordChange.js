import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Message from './../master/message/Message';
import { handleChangePasswordInput, updatedPassword } from './_redux/action/UserAction';
import SmallLoading from './../master/simpleLoading/SmallLoading';

const PasswordChange = () => {

    const dispatch = useDispatch();
    const { register, errors, handleSubmit, setValue } = useForm();
    const [showOldPass, setShowOldPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [confirmPassShow, setConfirmPassShow] = useState(false)

    const passwordInput = useSelector((state) => state.UserReducer.passwordInput);
    const isUpdating = useSelector((state) => state.UserReducer.isUpdating);


    const handleLoginInputChange = (name, value) => {
        dispatch(handleChangePasswordInput(name, value));
    };

    const onSubmit = data => {
        dispatch(updatedPassword(passwordInput))
    };
    return (
        <div className="dashboard-body">
            <div className="profile">
                <div className="dashboard_body_header">
                    <h5 className="title"> Password Change </h5>
                </div>
                <div className="password_change_body">
                    <form
                        className="profile-form"
                        autoComplete="off"
                        autoSave="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                         <div className="input-item">
                            <label>Old Password</label>
                            <div className="password_input_group">
                                <input
                                    type={showOldPass === false ? "password" : "text"}
                                    name="old_password"
                                    placeholder="Old Password"
                                    ref={register({ required: true })}
                                    value={passwordInput.old_password}
                                    onChange={(e) =>
                                        handleLoginInputChange("old_password", e.target.value)
                                    }
                                />
                                <span className="password_hide_show pointer" onClick={() => setShowOldPass(!showOldPass)}>
                                    {
                                        showOldPass === false ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>

                                    }
                                </span>
                            </div>
                            {errors.old_password && <Message text={"Enter your old password"} />}

                        </div>
                        <div className="input-item">
                            <label>New Password</label>
                            <div className="password_input_group">
                                <input
                                    type={showPass === false ? "password" : "text"}
                                    name="password"
                                    placeholder="New Password"
                                    value={passwordInput.password}

                                    ref={register({
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}

                                    onChange={(e) =>
                                        handleLoginInputChange("password", e.target.value)
                                    }
                                />
                                <span className="password_hide_show pointer" onClick={() => setShowPass(!showPass)}>
                                    {
                                        showPass === false ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>

                                    }
                                </span>
                            </div>
                            {errors.password && <Message text={errors.password.message} />}

                        </div>

                        <div className="input-item">
                            <label>Confirm Password</label>
                            <div className="password_input_group">
                                <input
                                    type={confirmPassShow === false ? "password" : "text"}
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    value={passwordInput.password_confirmation}
                                    ref={register({
                                        validate: value =>
                                            value === passwordInput.password || "The passwords do not match"
                                    })}

                                    onChange={(e) =>
                                        handleLoginInputChange("password_confirmation", e.target.value)
                                    }
                                />
                                <span className="password_hide_show pointer" onClick={() => setConfirmPassShow(!confirmPassShow)}>
                                    {
                                        confirmPassShow === false ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>

                                    }
                                </span>
                            </div>

                            {errors.password_confirmation && <Message text={errors.password_confirmation.message} />}
                        </div>
                        
                        {
                            !isUpdating && (
                                <div>
                                    <button type="submit" className="submit">Changet</button>
                                </div>
                            )
                        }
                        {
                            isUpdating && (
                                <div>
                                    <button type="submit" className="submit d-flex" disabled={true}>
                                        <span> <SmallLoading color="#fff" type="spokes" /> </span>
                                        <span className="ml-2">Changing...</span>
                                    </button>
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;