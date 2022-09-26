import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
// import logo from "../../assets/images/aonemart.png";
import logo from "../../assets/images/updateaonmart.png";
import { toggleModal } from "../../_redux/_global_store/action/GlobalAction";
import SignIn from "../authentication/SignIn";
import { handleLogoutUser } from "../authentication/_redux/Action/AuthAction";
import {
  getLocalSearchInfo,
  getStoreList,
  handleChangeSearchLocation,
  storeSearchLocationData
} from "../Location&Store/_redux/action/Location&StoreAction";
import SimpleModel from "../master/simpleModal/SimpleModel";
import SearchInput from "../SearchInput/SearchInput";
import { getUserDataAction } from "../_redux/getUserData/Action/UserDataAction";
import "./Header.css";

const Header = ({ setIsMenuOpen, isMenuOpen }) => {
  const history = useHistory();
  const { register, errors, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [toggleLocation, setToggleLocation] = useState(false);
  const isModalActive = useSelector(
    (state) => state.GlobalReducer.isModalActive
  );
  const singleUserInfo = useSelector(
    (state) => state.UserReducer.singleUserInfo
  );
  const userData = useSelector((state) => state.UserDataReducer.userData);
  const LocalSearchInfo = useSelector(
    (state) => state.LocationStoreReducer.LocalSearchInfo
  );

  // new

  const storeList = useSelector(
    (state) => state.LocationStoreReducer.storeList
  );
  const searchStoreInput = useSelector(
    (state) => state.LocationStoreReducer.searchStoreInput
  );

  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) ||
    searchStoreInput?.store;

  // console.log('storeValue', storeInformation.store)
  // const onSubmit = (e) => {
  //   dispatch(storeSearchLocationData(searchStoreInput));
  //   // dispatch(selectStorModal(false));
  //   e.preventDefault();
  // };

  const handleSearchInputChange = (name, value) => {
    dispatch(handleChangeSearchLocation(name, value));
  };

  useEffect(() => {
    dispatch(storeSearchLocationData(searchStoreInput));
    // history.push('/')
  }, [searchStoreInput]);

  useEffect(() => {
    dispatch(getStoreList());
  }, []);

  // end

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };
  const handleCloseModal = () => {
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    dispatch(getUserDataAction());
    dispatch(getLocalSearchInfo());
  }, []);

  return (
    <React.Fragment>
      <header className="header">
        <div className="header-bottom fixed-totop">
          <div className="row m-0 align-items-center mega-menu-relative">
            <div className="col-md-1 col-1 p-0">
              <div className="all-catagory-option">
                <span className="bar-btn pointer custom_bar">
                  <i
                    className="fas fa-bars"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  ></i>
                </span>
                <span className="close-btn pointer">
                  <i
                    className="fas fa-bars"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-md-1 col-1 d-none d-md-block">
              <Link to="/">
                <img className="img-fluid headerLogo" src={logo} alt="logo" />
              </Link>
            </div>

            <div className="col-md-9 col-9 col-lg-10 ">
              <div className="menu-area d-flex justify-content-md-end align-items-center">
                <SearchInput />
               
{/* fgfdgdfg */}
                <ul className="site-action d-lg-flex align-items-center justify-content-between ml-3 heading_search">
                  <li>
                    {/* input store */}
                    <div
                      className="flux-custom-select"
                      onClick={() => setToggleLocation(!toggleLocation)}
                    >
                      <div
                      // className={
                      //   toggleLocation === true
                      //     ? "select-selected select-arrow-active"
                      //     : "select-selected"
                      // }
                      ></div>
                      <form
                        className="select-store"
                        // className={
                        //   toggleLocation === true
                        //     ? "select-items"
                        //     : "select-hide"
                        // }
                      >
                        <div className="input-section">
                          <RHFInput
                            as={<Select options={storeList} />}
                            placeholder="Select Store"
                            rules={{ required: true }}
                            name="storeID"
                            register={register}
                            value={storeInformation?.store}
                            onChange={(option) => {
                              handleSearchInputChange("storeID", option.value);
                              handleSearchInputChange(
                                "storeName",
                                option.label
                              );
                            }}
                            setValue={setValue}
                          />
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="signin-option rounded-0 ml-3" style={{width:"124px"}}>
                    {typeof userData !== "undefined" &&
                    userData !== null &&
                    userData !== "" ? (
                      <Dropdown className="my-account">
                        <Dropdown.Toggle id="dropdown-basic">
                          <i className="fas fa-user mr-1"></i>
                          {singleUserInfo?.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="submenu dropdown-menu">
                          <Dropdown.Item>
                            <Link to="/account" className="account_nav_link">
                              <span className="icon">
                                <svg
                                  viewBox="-42 0 512 512.001"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0"></path>
                                  <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0"></path>
                                </svg>
                              </span>
                              <span>My Accountdd</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/order">
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 489 489"
                                >
                                  <g>
                                    <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3  c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1 C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462 H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>My Orders</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/wishlist">
                              <span className="icon">
                                <svg
                                  enable-background="new 0 0 512 512"
                                  height="512"
                                  viewBox="0 0 512 512"
                                  width="512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m119.557 269.906h147.752v30h-147.752z"></path>
                                    <path d="m119.557 334.827h94.024v30h-94.024z"></path>
                                    <path d="m119.557 399.747h208.306v30h-208.306z"></path>
                                    <path d="m179.091 192.173h43.444v30h-43.444z"></path>
                                    <path d="m119.557 192.173h29.534v30h-29.534z"></path>
                                    <path d="m379.7 0c-18.762 0-36.581 6.456-50.787 18.094-14.206-11.638-32.024-18.094-50.786-18.094-43.291 0-78.67 34.443-80.222 77.362h-145.901v434.638h343.413v-335.574c29.519-28.441 45.198-43.755 46.73-45.649 11.511-14.225 17.85-32.152 17.85-50.48-.001-44.276-36.021-80.297-80.297-80.297zm-50.787 198.723c-37.056-35.55-85.234-81.929-90.145-87.108-7.157-8.975-10.938-19.795-10.938-31.318 0-27.734 22.563-50.297 50.296-50.297 15.249 0 29.509 6.817 39.123 18.705l11.663 14.419 11.663-14.419c9.616-11.888 23.875-18.705 39.125-18.705 27.733 0 50.296 22.563 50.296 50.297 0 11.522-3.78 22.342-10.938 31.317-4.905 5.175-53.087 51.557-90.145 87.109zm36.503 283.277h-283.412v-374.638h120.544c3.022 8.444 7.444 16.384 13.135 23.417 2.317 2.864 113.231 109.504 113.231 109.504l36.503-35.009v276.726z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>My Wishlist</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/password-change">
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 512.002 512.002"
                                >
                                  <g>
                                    <circle
                                      cx="338"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <path d="M238,472.001H80c-22.056,0-40-17.944-40-40v-164c0-22.056,17.944-40,40-40h288c22.056,0,40,17.944,40,40v40 c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-40c0-44.112-35.888-80-80-80h-24.037v-70.534 c0-64.771-53.832-117.466-120-117.466s-120,52.695-120,117.466v70.534H80c-44.112,0-80,35.888-80,80v164 c0,44.112,35.888,80,80,80h158c11.046,0,20-8.954,20-20S249.046,472.001,238,472.001z M143.963,117.467 c0-42.715,35.888-77.466,80-77.466s80,34.751,80,77.466v70.534h-160V117.467z"></path>
                                    <path d="M503.643,325.739c-8.982-6.431-21.477-4.362-27.904,4.62l-98.581,137.7c-2.692,3.122-6.066,3.796-7.874,3.916 c-1.854,0.123-5.424-0.112-8.567-3.061l-63.708-62.171c-7.906-7.716-20.568-7.559-28.282,0.345 c-7.715,7.905-7.561,20.567,0.345,28.282l63.82,62.281c0.06,0.058,0.119,0.116,0.18,0.173C342.639,506.933,355.41,512,368.55,512 c1.129,0,2.261-0.037,3.393-0.113c14.314-0.954,27.679-7.915,36.666-19.097c0.232-0.29,0.456-0.585,0.673-0.887l98.981-138.26 C514.692,344.662,512.624,332.168,503.643,325.739z"></path>
                                    <circle
                                      cx="262"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <circle
                                      cx="112"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <circle
                                      cx="187"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                  </g>
                                </svg>
                              </span>
                              <span>Change Password</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link
                              to={`/login`}
                              onClick={() => dispatch(handleLogoutUser())}
                            >
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 490.667 490.667"
                                >
                                  <g>
                                    <path d="M330.667,192c5.888,0,10.667-4.779,10.667-10.667v-128C341.333,23.936,317.419,0,288,0H53.333C23.915,0,0,23.936,0,53.333 v384c0,29.397,23.915,53.333,53.333,53.333H288c29.419,0,53.333-23.936,53.333-53.333v-128c0-5.888-4.779-10.667-10.667-10.667 S320,303.445,320,309.333v128c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32v-384c0-17.643,14.357-32,32-32H288 c17.643,0,32,14.357,32,32v128C320,187.221,324.779,192,330.667,192z"></path>
                                  </g>
                                  <g>
                                    <path d="M480,234.667H138.667c-5.888,0-10.667,4.779-10.667,10.667S132.779,256,138.667,256H480 c5.888,0,10.667-4.779,10.667-10.667S485.888,234.667,480,234.667z"></path>
                                  </g>
                                  <g>
                                    <path d="M487.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448 c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.093l64-64 C491.691,248.747,491.691,241.984,487.531,237.824z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>Logout</span>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <span
                        className="account_sign_in"
                        onClick={() => handleToggleModal()}
                      >
                        <i class="fas fa-user mr-2"> </i>Sign in
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-1 col-2  d-lg-none d-block " >
              <ul>
            <li className="signin-option rounded-0">
                    {typeof userData !== "undefined" &&
                    userData !== null &&
                    userData !== "" ? (
                      <Dropdown className="my-account">
                        <Dropdown.Toggle id="dropdown-basic">
                          <i className="fas fa-user mr-1"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="submenu dropdown-menu">
                          <Dropdown.Item>
                            <Link to="/account" className="account_nav_link">
                              <span className="icon">
                                <svg
                                  viewBox="-42 0 512 512.001"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0"></path>
                                  <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0"></path>
                                </svg>
                              </span>
                              <span>My Account</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/order">
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 489 489"
                                >
                                  <g>
                                    <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3  c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1 C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462 H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41 c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>My Orders</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/wishlist">
                              <span className="icon">
                                <svg
                                  enable-background="new 0 0 512 512"
                                  height="512"
                                  viewBox="0 0 512 512"
                                  width="512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path d="m119.557 269.906h147.752v30h-147.752z"></path>
                                    <path d="m119.557 334.827h94.024v30h-94.024z"></path>
                                    <path d="m119.557 399.747h208.306v30h-208.306z"></path>
                                    <path d="m179.091 192.173h43.444v30h-43.444z"></path>
                                    <path d="m119.557 192.173h29.534v30h-29.534z"></path>
                                    <path d="m379.7 0c-18.762 0-36.581 6.456-50.787 18.094-14.206-11.638-32.024-18.094-50.786-18.094-43.291 0-78.67 34.443-80.222 77.362h-145.901v434.638h343.413v-335.574c29.519-28.441 45.198-43.755 46.73-45.649 11.511-14.225 17.85-32.152 17.85-50.48-.001-44.276-36.021-80.297-80.297-80.297zm-50.787 198.723c-37.056-35.55-85.234-81.929-90.145-87.108-7.157-8.975-10.938-19.795-10.938-31.318 0-27.734 22.563-50.297 50.296-50.297 15.249 0 29.509 6.817 39.123 18.705l11.663 14.419 11.663-14.419c9.616-11.888 23.875-18.705 39.125-18.705 27.733 0 50.296 22.563 50.296 50.297 0 11.522-3.78 22.342-10.938 31.317-4.905 5.175-53.087 51.557-90.145 87.109zm36.503 283.277h-283.412v-374.638h120.544c3.022 8.444 7.444 16.384 13.135 23.417 2.317 2.864 113.231 109.504 113.231 109.504l36.503-35.009v276.726z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>My Wishlist</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to="/password-change">
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 512.002 512.002"
                                >
                                  <g>
                                    <circle
                                      cx="338"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <path d="M238,472.001H80c-22.056,0-40-17.944-40-40v-164c0-22.056,17.944-40,40-40h288c22.056,0,40,17.944,40,40v40 c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-40c0-44.112-35.888-80-80-80h-24.037v-70.534 c0-64.771-53.832-117.466-120-117.466s-120,52.695-120,117.466v70.534H80c-44.112,0-80,35.888-80,80v164 c0,44.112,35.888,80,80,80h158c11.046,0,20-8.954,20-20S249.046,472.001,238,472.001z M143.963,117.467 c0-42.715,35.888-77.466,80-77.466s80,34.751,80,77.466v70.534h-160V117.467z"></path>
                                    <path d="M503.643,325.739c-8.982-6.431-21.477-4.362-27.904,4.62l-98.581,137.7c-2.692,3.122-6.066,3.796-7.874,3.916 c-1.854,0.123-5.424-0.112-8.567-3.061l-63.708-62.171c-7.906-7.716-20.568-7.559-28.282,0.345 c-7.715,7.905-7.561,20.567,0.345,28.282l63.82,62.281c0.06,0.058,0.119,0.116,0.18,0.173C342.639,506.933,355.41,512,368.55,512 c1.129,0,2.261-0.037,3.393-0.113c14.314-0.954,27.679-7.915,36.666-19.097c0.232-0.29,0.456-0.585,0.673-0.887l98.981-138.26 C514.692,344.662,512.624,332.168,503.643,325.739z"></path>
                                    <circle
                                      cx="262"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <circle
                                      cx="112"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                    <circle
                                      cx="187"
                                      cy="346.001"
                                      r="20"
                                    ></circle>
                                  </g>
                                </svg>
                              </span>
                              <span>Change Password</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link
                              to={`/login`}
                              onClick={() => dispatch(handleLogoutUser())}
                            >
                              <span className="icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 490.667 490.667"
                                >
                                  <g>
                                    <path d="M330.667,192c5.888,0,10.667-4.779,10.667-10.667v-128C341.333,23.936,317.419,0,288,0H53.333C23.915,0,0,23.936,0,53.333 v384c0,29.397,23.915,53.333,53.333,53.333H288c29.419,0,53.333-23.936,53.333-53.333v-128c0-5.888-4.779-10.667-10.667-10.667 S320,303.445,320,309.333v128c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32v-384c0-17.643,14.357-32,32-32H288 c17.643,0,32,14.357,32,32v128C320,187.221,324.779,192,330.667,192z"></path>
                                  </g>
                                  <g>
                                    <path d="M480,234.667H138.667c-5.888,0-10.667,4.779-10.667,10.667S132.779,256,138.667,256H480 c5.888,0,10.667-4.779,10.667-10.667S485.888,234.667,480,234.667z"></path>
                                  </g>
                                  <g>
                                    <path d="M487.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448 c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.093l64-64 C491.691,248.747,491.691,241.984,487.531,237.824z"></path>
                                  </g>
                                </svg>
                              </span>
                              <span>Logout</span>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <span
                        className="account_sign_in"
                        onClick={() => handleToggleModal()}
                      >
                        <i class="fas fa-user mr-2"> </i>
                      </span>
                    )}
                  </li>

              </ul>
            </div>
            <div>
              
            </div>

            {/* <div className="col-md-3 col-2 col-sm-2 d-md-none ">
              <div className="text-center ">
                <button
                  type="button"
                  className="map-marker"
                  data-toggle="modal"
                  data-target="#search-select-id"
                >
                  <img src={mapImg} alt="" />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </header>
      <SimpleModel
        show={isModalActive}
        handleClose={handleCloseModal}
        size="md"
        onHide={() => handleCloseModal}
      >
        <SignIn handleClose={handleCloseModal} />
      </SimpleModel>
    </React.Fragment>
  );
};

export default Header;
