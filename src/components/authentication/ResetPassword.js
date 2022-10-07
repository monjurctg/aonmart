import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import BannerServices from "../landingBannerTop/api";
import { showToast } from "../master/Helper/Notification";
import Message from "./../master/message/Message";
// import { handleChangePasswordInput, updatedPassword } from './_redux/action/UserAction';
import SmallLoading from "./../master/simpleLoading/SmallLoading";
import Otp from "./Otp";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, setValue } = useForm();
  const [otp, setOtp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [email, setEmail] = useState();
  console.log("email", email);
  const passwordInput = useSelector((state) => state.UserReducer.passwordInput);
  // console.log('passwordInput', passwordInput)
  const isUpdating = useSelector((state) => state.UserReducer.isUpdating);

  const handleLoginInputChange = (e) => {
    // dispatch(handleChangePasswordInput(name, value));
  };

  const onSubmit = async () => {
    let res = await BannerServices.forgetPassword({ email_or_phone: email });
    // showToast('error', responseLog.data.message);
    if (res.status === 200) {
      showToast("success", res.data.message);
      setOtp(true)
    } else {
      showToast("error", res.message);
    }
    console.log("res", res); // dispatch(updatedPassword(passwordInput))
  };

  let passWordResetInput = (
    <div className="password_change_body">
      <form
        className="profile-form"
        autoComplete="off"
        autoSave="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-item">
          <label>Email</label>
          <div className="password_input_group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              ref={register({ required: true })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.mobile && <Message text={"Please enter your email"} />}
        </div>

        {!isUpdating && (
          <div>
            <button type="submit" className="submit">
              Change
            </button>
          </div>
        )}
        {isUpdating && (
          <div>
            <button type="submit" className="submit d-flex" disabled={true}>
              <span>
                {" "}
                <SmallLoading color="#fff" type="spokes" />{" "}
              </span>
              <span className="ml-2">Changing...</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );

  let activeModule = passWordResetInput;
  if(otp){
      activeModule = <Otp email={email}/>
  }
  return (
    <div className="dashboard-body">
      <div className="profile">
        <div className="dashboard_body_header">
          <h5 className="title"> Password Reset </h5>
        </div>
        {activeModule}
      </div>
    </div>
  );
};

export default ResetPassword;
