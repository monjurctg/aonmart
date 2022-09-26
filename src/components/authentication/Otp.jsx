import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BannerServices from "../landingBannerTop/api";
import { showToast } from "../master/Helper/Notification";
import Message from "./../master/message/Message";
// import { handleChangePasswordInput, updatedPassword } from './_redux/action/UserAction';
import SmallLoading from "./../master/simpleLoading/SmallLoading";

const Otp = ({ email }) => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, setValue } = useForm();
  const history = useHistory();

  const [otp, setOtp] = useState();
  const [showPass, setShowPass] = useState(false);
  const [passwordInputsShow, setPasswordInputsShow] = useState(false);

  const [confirmShow, setConfirmShow] = useState(false);

  const [new_password, setNew_password] = useState();
  const [new_password_confirmation, setNew_password_confirmation] = useState();

  const passwordInput = useSelector((state) => state.UserReducer.passwordInput);
  // console.log('passwordInput', passwordInput)
  const isUpdating = useSelector((state) => state.UserReducer.isUpdating);

  const handleLoginInputChange = (e) => {
    // dispatch(handleChangePasswordInput(name, value));
  };

  const onSubmit = async () => {
    let res = passwordInputsShow
      ? await BannerServices.reset({
          email_or_phone: email,
          otp,
          new_password,
          new_password_confirmation,
        })
      : await BannerServices.otpVerify({
          email_or_phone: email,
          otp,
        });
    // showToast('error', responseLog.data.message);
    if (res.status === 200) {
      showToast("success", res.data.message);
      setPasswordInputsShow(true);
      history.push("/");
    } else {
      showToast("error", res.message);
      setPasswordInputsShow(true);
    }
    // console.log("res", res); // dispatch(updatedPassword(passwordInput))
  };
  return (
    <div className="password_change_body">
      <form
        className="profile-form"
        autoComplete="off"
        autoSave="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-item">
          <label>Otp</label>
          <div className="password_input_group">
            <input
              type="phone"
              name="otp"
              placeholder="Please enter your otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {errors.mobile && <Message text={"Please enter your otp"} />}
        </div>
        {passwordInputsShow ? (
          <>
            <div className="input-item">
              <label>New Password</label>
              <div className="password_input_group">
                <input
                  type={showPass ? "text" : "password"}
                  name="new_password"
                  placeholder="Please enter your new password"
                  //   ref={register({ required: true })}
                  value={new_password}
                  required
                  onChange={(e) => setNew_password(e.target.value)}
                />
                <span
                  className="password_hide_show pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass === false ? (
                    <i className="far fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </span>
              </div>
              {errors.password && <Message text={errors.password.message} />}
            </div>

            <div className="input-item">
              <label>Confirm Password</label>
              <div className="password_input_group">
                <input
                  type={confirmShow ? "text" : "password"}
                  name="new_password_confirmation"
                  placeholder="Please enter your confirm new password"
                  required
                  value={new_password_confirmation}
                  onChange={(e) => setNew_password_confirmation(e.target.value)}
                />
                <span
                  className="password_hide_show pointer"
                  onClick={() => setConfirmShow(!confirmShow)}
                >
                  {confirmShow === false ? (
                    <i className="far fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </span>
              </div>

              {errors.password_confirmation && (
                <Message text={errors.password_confirmation.message} />
              )}
            </div>
          </>
        ) : (
          ""
        )}

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
                <SmallLoading color="#fff" type="spokes" />{" "}
              </span>
              <span className="ml-2">Changing...</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Otp;
