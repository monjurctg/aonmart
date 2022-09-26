import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import FloatingCart from "../../components/cart/FloatingCart";
import FloatingCartButton from "../../components/cart/FloatingCartButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SidebarMenu from "../../components/productSidebar/SidebarMenu";
import {getUserDataAction} from "../../components/_redux/getUserData/Action/UserDataAction";
import DashboardSidebar from "./../../components/dashboard/dashboardSIdebar/DashboardSidebar";
import "./DashboardLayout.css";
// import DashboardCover from "../../components/dashboard/DashboardCover";
// import Header from "../../components/header/HeaderPrevousFile";

const DashboardLayout = ({children, title, description}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDataReducer.userData);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  console.log(screenWidth, "screenWidth");
  let condition = screenWidth < 1102 ? false : true;
  // console.log(condition, "condition");
  const [isMenuOpen, setIsMenuOpen] = useState(condition);
  document.title =
    typeof title !== "undefined" && title !== null
      ? `Aonmart Grocery Shop || ${title}`
      : "Aonmart Grocery Shop";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.screen.width);
    });

    if (condition) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [window.screen.width]);

  // const [isMenuOpen, setIsMenuOpen] = useState(true);
  document.title =
    typeof title !== "undefined" && title !== null
      ? `Aonmart Grocery Shop || ${title}`
      : "Aonmart Grocery Shop";

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* <div className={`page-layout ${isMenuOpen ? "open-side-menu" : ""}`}> */}
      <div>
        {/* <div className={isMenuOpen ? "toggledMenu" : "isNotToggledMenu"}>
          <SidebarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div> */}
        <div
          className={
            isMenuOpen
              ? "toggledBody section-ptb"
              : "isNotToggledBody section-ptb"
          }>
          {/* <DashboardCover /> */}
          <div className="user_profile_container py-md-5 py-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 d-none d-lg-block">
                  <DashboardSidebar />
                </div>
                <div className="col-lg-9 mt-5 mt-sm-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingCart />
        <FloatingCartButton />
      </div>
    </>
  );
};

export default DashboardLayout;
