import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SmallLoading from "../master/simpleLoading/SmallLoading";
import Message from "./../master/message/Message";
import {
  handleChangeRegisterInput,
  handleUserRegistration
} from "./_redux/Action/AuthAction";

const Registration = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);

  const registerInput = useSelector((state) => state.AuthReducer.registerInput);
  const isRegistering = useSelector((state) => state.AuthReducer.isRegistering);

  const onSubmit = async (data) => {
    await dispatch(handleUserRegistration(registerInput));
  };

  const handleLoginInputChange = (name, value) => {
    dispatch(handleChangeRegisterInput(name, value));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="login-section section-ptb py-5">
      <div className="container">
        <div className="row align-items-center">
          <h3 style={{paddingLeft:"35px",margin:"auto",width:"10rem"
    ,paddingBottom: "1rem"}}>Sign up</h3>
          <div className="col-lg-12">
            <div className="eflux-login-form-area">
              <form
                className="eflux-login-form"
                autoComplete="off"
                autoSave="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label> Name</label> */}
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        ref={register({ required: true })}
                        value={registerInput.name}
                        onChange={(e) =>
                          handleLoginInputChange("name", e.target.value)
                        }
                      />
                      {errors.name?.type === "required" && (
                        <Message text="Full name is required !" />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Phone</label> */}
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Phone"
                        ref={register({ required: true })}
                        value={registerInput.mobile}
                        onChange={(e) =>
                          handleLoginInputChange("mobile", e.target.value)
                        }
                      />
                      {errors.mobile?.type === "required" && (
                        <Message text="Phone number is required !" />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Email</label> */}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email(optional)"
                        ref={register({ required: false })}
                        value={registerInput.email}
                        onChange={(e) =>
                          handleLoginInputChange("email", e.target.value)
                        }
                      />
                      {errors.email?.type === "required" && (
                        <Message text="Email is required !" />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Password</label> */}
                      <div className="password_input_group">
                        <input
                          type={showPass === false ? "password" : "text"}
                          name="password"
                          placeholder="Password"
                          value={registerInput.password}
                          ref={register({
                            required: "You must enter a password",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be 8 characters",
                            },
                          })}
                          onChange={(e) =>
                            handleLoginInputChange("password", e.target.value)
                          }
                        />
                        <span
                          className="password_hide_show pointer t-12%"
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass === false ? (
                            <i className="far fa-eye"></i>
                          ) : (
                            <i className="far fa-eye-slash"></i>
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <Message text={errors.password.message} />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Confirm Password</label> */}
                      <div className="password_input_group">
                        <input
                          type={confirmPassShow === false ? "password" : "text"}
                          name="password_confirmation"
                          placeholder="Confirm Password"
                          value={registerInput.password_confirmation}
                          ref={register({
                            validate: (value) =>
                              value === registerInput.password ||
                              "Passwords do not match !",
                          })}
                          onChange={(e) =>
                            handleLoginInputChange(
                              "password_confirmation",
                              e.target.value
                            )
                          }
                        />
                        <span
                          className="password_hide_show pointer"
                          onClick={() => setConfirmPassShow(!confirmPassShow)}
                        >
                          {confirmPassShow === false ? (
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
                  </div>
                </div>
                {!isRegistering && (
                  <div className="text-center">
                    <button type="submit" className="submit">
                      Create Account
                    </button>
                  </div>
                )}
                {isRegistering && (
                  <div className="text-center" style={{width: "10rem",
                    margin: "auto"}}>
                    <button
                      type="submit"
                      className="submit d-flex"
                      disabled={true}
                    >
                      <span>
                        
                        <SmallLoading color="#fff" type="spokes" />
                      </span>
                      <span className="ml-2">Creating...</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
