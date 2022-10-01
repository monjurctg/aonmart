import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/updateaonmart.png";
import { toggleFloatingCart } from "../../_redux/_global_store/action/GlobalAction";
import { getCartsAction } from "../cart/_redux/action/CartAction";
import appleStore from "./../../assets/images/app-store/apple.png";
import googlePlayStore from "./../../assets/images/app-store/google.png";
import "./Footer.css";

const Footer = () => {
  const dispatch = useDispatch();
  const { carts, totalPrice } = useSelector((state) => state.CartReducer);

  const flashDealBtnHandler = () => {
    dispatch(toggleFloatingCart());
  };

  useEffect(() => {
    dispatch(getCartsAction());
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          {/* <div className="footer-newsletter">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-left mb-2ggit  mb-md-0">
                                <div className="newsletter-heading">
                                    <h5>Know it all first</h5>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                                <div className="newsletter-form">
                                    <input type="text" name="email" placeholder="E-mail Address" />
                                    <button className="submit-btn">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" space="preserve">
                                            <path style={{ fill: "#2196F3" }} d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192 c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667 C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328 c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192 C509.872,262.42,510.655,261.246,511.189,259.954z" />
                                            <path d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88 L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192 c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z" />
                                            <path d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667 c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z" />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-12 d-flex  align-items-center flex-column">
              <div className="footer-widget">
                  <Link to="/" className="footer-logo">
                    <img
                      style={{ width: "120px", height: "120px" }}
                      src={logo}
                      alt="logo"
                    />
                    {/* <img className="img-fluid" src={logo} alt="logo" /> */}
                  </Link>
                
                </div>
              
                  <ul className="social_media_list d-flex flex-wrap">
                    <a href="https://www.facebook.com/AonMart.net/">
                      <li className="aon_mart_social_share">
                        <i className="fab fa-facebook-f"></i>
                      </li>
                    </a>
                    <a href = "https://www.youtube.com/channel/UCSEAUdT6noQA4zBCj2Asc_A">

                    <li className="aon_mart_social_share">
                      <i class="fab fa-youtube"></i>
                    </li>
                    </a>
                    <li className="aon_mart_social_share">
                      <Link to="/">
                        <i className="fab fa-vimeo-v"></i>
                      </Link>
                    </li>
                    <li className="aon_mart_social_share">
                      <Link to="/">
                        <i className="fab fa-pinterest-p"></i>
                      </Link>
                    </li>
                  </ul>
                  <p className="mt-2 font-weight-bold">A Trusted Source For All Your Family Needs</p>

        
              </div>
              <div className="col-md-6 col-12 mt-25 d-flex justify-content-center align-items-end column-reverse">
                <div className="footer-widget">
                  <h5 className="footer-title text-center">Download Apps</h5>
                  <div className="widget-wrapper">
                    <div className="apps-store d-flex align-items-center">
                      <Link to="/">
                        <img className="img-fluid" src={appleStore} alt="app" />
                      </Link>
                      <Link to="/">
                        <img
                          className="img-fluid"
                          src={googlePlayStore}
                          alt="app"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4 col-12">
                <img src={paymentImg} className="w-100" alt="" />
              </div> */}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="row">
              <div className="col-lg-7 text-center text-lg-left mb-3 mb-md-0">
                <p className="copyright" style={{fontSize:"16px"}}>
                  Copyright &copy; <Link to="/">Aonmart</Link>. All Rights
                  Reserved.
                </p>
              </div>

              <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
                <ul className="footer-menu d-flex flex-wrap">
                  <li>
                    <a style={{color:"#464646",fontSize:"19px",fontWeight:"600"}} href="/">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-footer d-flex justify-content-between align-items-center d-lg-none">
        <button
          className="info"
          type="button"
          data-toggle="modal"
          data-target="#siteinfo1"
        >
          <Link to="/">
            <i className="fa fa-home"></i>
          </Link>

          {/* <i className="fas fa-info-circle"></i> */}
        </button>

        <div className="footer-cart pointer" onClick={flashDealBtnHandler}>
          <span className="d-flex align-items-center">
            <span className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="count">{carts.length}</span>
            </span>
            <span className="cart-amount ml-2">{totalPrice}Tk</span>
          </span>
        </div>

        <div className="footer-admin-area">
          {/* <span className="user-admin">
                        <i className="fas fa-user"></i>
                    </span> */}
          <button
            className="user-admin"
            type="button"
            data-toggle="modal"
            data-target="#useradmin1"
          >
             <Link to="/account">
              <i className="fas fa-user"></i>
             </Link>
            
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
