import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toggleModal } from "../../_redux/_global_store/action/GlobalAction";
import Message from "./../master/message/Message";
import SmallLoading from "./../master/simpleLoading/SmallLoading";
import { handleLoginInput, loginAction } from "./_redux/Action/AuthAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const { register, errors, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);

  const loginInput = useSelector((state) => state.AuthReducer.loginInput);
  const isLoading = useSelector((state) => state.AuthReducer.isLoading);
  const userData = useSelector((state) => state.UserDataReducer.userData);

  const handleLoginInputChange = (name, value) => {
    dispatch(handleLoginInput(name, value));
  };

  const  onSubmit = async (data) => {
    await dispatch(loginAction(loginInput));
  };

  useEffect(() => {
    if (
      typeof userData !== "undefined" &&
      userData !== null &&
      userData !== ""
    ) {
      history.replace(from);
    }
  }, [userData]);

  const redirectToRegister = () => {
    history.push("/register");
    dispatch(toggleModal(false));
  };
  const redirectToPasswordReset = () => {
    history.push("/reset-password");
    dispatch(toggleModal(false));
  };

  return (
    <>
      <div className="login-area" style={{position:"relative"}}>
        <div className="login-body">
          <div className="login-header">
            <h4>Sign In</h4>
            <p>Sign in with your phone number &amp; password</p>
          </div>
          <div className="login-content">
            <form
              className="login-form"
              autoComplete="off"
              autoSave="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                ref={register({ required: true })}
                value={loginInput.mobile}
                onChange={(e) =>
                  handleLoginInputChange("mobile", e.target.value)
                }
              />
              {errors.mobile && errors.mobile?.type === "required" && (
                <Message text="Mobile number is required !" />
              )}

              <div className="password_input_group">
                <input
                  type={showPass === false ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  ref={register({ required: true })}
                  value={loginInput.password}
                  onChange={(e) =>
                    handleLoginInputChange("password", e.target.value)
                  }
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
              {errors.password && errors.password.type === "required" && (
                <Message text="Password number is required !" />
              )}

              {!isLoading && (
                <div>
                  <button type="submit" className="submit">
                    Sign In
                  </button>
                </div>
              )}
              {isLoading && (
                <div>
                  <button
                    type="submit"
                    className="submit d-flex justify-content-center"
                    disabled={true}
                  >
                    <span>
                      <SmallLoading color="#fff" type="spokes" />
                    </span>
                    <div className="ml-2">Submitting...</div>
                  </button>
                </div>
              )}
            </form>
            {/* <div className="text-center seperator">
                            <span>Or</span>
                        </div>
                        <div className="othersignup-option">
                            <a className="facebook" href="/"><i className="fab fa-facebook-square"></i>Continue with Facebook</a>
                            <a className="google" href="/"><i className="fab fa-google-plus"></i>Continue with Google</a>
                        </div> */}
            <div className="text-center dont-account py-4">
              <p className="mb-0">
                Don't have any account ? {" "}
                <span className="pointer" onClick={() => redirectToRegister()}>
                  Sign Up
                </span>
              </p>
              {/* <p className="mb-0">Don't have any account <Link to="/register">Sing Up</Link></p> */}
            </div>
          </div>
        </div>

        <div className="forgot-password text-center">
          <p>
            Forgot Passowrd ? {" "}
            <span className="pointer" onClick={() => redirectToPasswordReset()}>
              Reset 
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
