import React, {useEffect, useState} from "react";
import ScrollToTop from "react-scroll-to-top";
import FloatingCart from "../../components/cart/FloatingCart";
import FloatingCartButton from "../../components/cart/FloatingCartButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SidebarMenu from "../../components/productSidebar/SidebarMenu";
import SidebarTest from "../../components/productSidebar/SidebarTest";

import "./MainLayout.css";

const MainLayout = ({children, title, description}) => {
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

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`page-layout ${isMenuOpen ? "open-side-menu" : ""}`}>
        <div
          className={isMenuOpen === true ? "toggledMenu" : "isNotToggledMenu"}>
          {/* <ProductSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
          {/* <SidebarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
          <SidebarTest isMenuOpen={isMenuOpen} />
        </div>
        <div
          className={
            isMenuOpen === true
              ? "toggledBody section-ptb"
              : "isNotToggledBody section-ptb"
          }>
          {children}
        </div>
        <Footer />
        <FloatingCart />
        <FloatingCartButton />
      </div>
      <ScrollToTop smooth />
    </>
  );
};

export default MainLayout;
