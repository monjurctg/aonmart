import React, {useEffect, useState} from "react";
import {useMemo} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import SmallLoading from "../master/simpleLoading/SmallLoading";
import Message from "./../master/message/Message";
import {
  handleChangeRegisterInput,
  handleUserRegistration,
} from "./_redux/Action/AuthAction";

const Registration = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm();
  const history = useHistory();
  const [inputData, setInputData] = useState({
    name: "",
    mobile: "",
    password: "",
    email: "",
    password_confirmation: "",
  });

  const [error, setError] = useState({
    name: "",
    mobile: "",
    password: "",
    password_confirmation: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const isRegSuccess = useSelector((state) => state.AuthReducer.isRegSuccess);

  const registerInput = useSelector((state) => state.AuthReducer.registerInput);
  const isRegistering = useSelector((state) => state.AuthReducer.isRegistering);

  const handleLoginInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    setError({
      name: "",
      mobile: "",
      password: "",
      password_confirmation: "",
    });
  };
  console.log(isRegSuccess, "isREg");

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("object");
    const {mobile, name, password, password_confirmation} = inputData;
    if (!name) setError({...error, name: "Name is Required"});
    else if (!mobile) setError({...error, mobile: "mobile is Required"});
    else if (!password) setError({...error, password: "password is Required"});
    else if (password !== password_confirmation)
      setError({...error, password_confirmation: "password not match"});
    if (mobile && name && password) {
      console.log("input data", inputData);
      dispatch(handleUserRegistration(inputData));
    }
  };

  useMemo(() => {
    if (isRegSuccess) {
      setInputData({
        name: "",
        mobile: "",
        password: "",
        password_confirmation: "",
      });
      history.push("/login");
    }
  }, [isRegSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="login-section section-ptb py-5">
      <div className="container">
        <div className="row align-items-center">
          <h3
            style={{
              paddingLeft: "35px",
              margin: "auto",
              width: "10rem",
              paddingBottom: "1rem",
            }}>
            Sign up
          </h3>
          <div className="col-lg-12">
            <div className="eflux-login-form-area">
              <form
                className="eflux-login-form"
                autoComplete="off"
                autoSave="off"
                onSubmit={onSubmit}>
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label> Name</label> */}
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        // ref={register({required: true})}
                        value={inputData.name}
                        onChange={handleLoginInputChange}
                      />
                      {error.name && <Message text={error.name} />}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Phone</label> */}
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Phone"
                        ref={register({required: true})}
                        value={inputData.mobile}
                        onChange={handleLoginInputChange}
                      />
                      {error.mobile && <Message text={error.mobile} />}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="input-item">
                      {/* <label>Email</label> */}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email(optional)"
                        value={inputData.email}
                        onChange={handleLoginInputChange}
                      />
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
                          value={inputData.password}
                          onChange={handleLoginInputChange}
                        />
                        <span
                          className="password_hide_show pointer t-12%"
                          onClick={() => setShowPass(!showPass)}>
                          {showPass === false ? (
                            <i className="far fa-eye"></i>
                          ) : (
                            <i className="far fa-eye-slash"></i>
                          )}
                        </span>
                      </div>
                      {error.password && <Message text={error.password} />}
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
                          value={inputData.password_confirmation}
                          onChange={handleLoginInputChange}
                        />
                        <span
                          className="password_hide_show pointer"
                          onClick={() => setConfirmPassShow(!confirmPassShow)}>
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
                  <div
                    className="text-center"
                    style={{width: "10rem", margin: "auto"}}>
                    <button
                      type="submit"
                      className="submit d-flex"
                      disabled={true}>
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
