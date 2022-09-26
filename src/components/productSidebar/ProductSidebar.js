import { faGem, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getProductSideMenuItem } from "../productSidebar/_redux/Action/ProductSidebarAction";
import vegetableIcon from "./../../assets/images/svg/vegetables.svg";
import harvest from "./../../assets/images/svg/harvest.svg";
import salad from "./../../assets/images/svg/salad.svg";
import seafood from "./../../assets/images/svg/seafood.svg";
import natural from "./../../assets/images/svg/natural.svg";
import eggs from "./../../assets/images/svg/eggs.svg";
import seasoning from "./../../assets/images/svg/seasoning.svg";
import refrigerator from "./../../assets/images/svg/refrigerator.svg";
import honey from "./../../assets/images/svg/honey.svg";
import { useState } from "react";

const ProductSidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const productSidebarItemList = useSelector(
    (state) => state.ProductSidebarReducer.productSidebarItemList
  );

  useEffect(() => {
    // dispatch(getProductSideMenuItem())
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    // <div className={`sidebar-menu${isMenuOpen === true ? " open" : ""}`}>

    //     {
    //         productSidebarItemList && productSidebarItemList.length > 0 && productSidebarItemList.map((menu, index) => (
    //             <ul className="vertical menu">
    //                 <li>
    //                     <>
    //                         { menu.menuTitle}
    //                     </>
    //                 </li>
    //             </ul>
    //         ))
    //     }
    // </div>
    <>
      <div className="catagory-sidebar-area fixed-totop">
        <div className="catagory-sidebar-area-inner">
          <div className="catagory-sidebar all-catagory-option">
            <ul className="catagory-submenu">
              <li>
                <a
                  data-toggle="collapse"
                  onClick={() => setExpanded(!expanded)}
                  href="#catagory-widget1"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget1"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={vegetableIcon} alt="icon" />
                    </span>
                    Vegetables
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget1"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget2"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget2"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={harvest} alt="icon" />
                    </span>
                    Fruits
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget2"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget3"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget3"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={salad} alt="icon" />
                    </span>
                    Salads
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget3"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget4"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget4"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={seafood} alt="icon" />
                    </span>
                    Fish & seafood
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget4"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget5"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget5"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={natural} alt="icon" />
                    </span>
                    Fresh Meat
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget5"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget6"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget6"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={natural} alt="icon" />
                    </span>
                    Health Products
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget6"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget7"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget7"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={eggs} alt="icon" />
                    </span>
                    Butter & Eggs
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget7"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget8"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget8"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={seasoning} alt="icon" />
                    </span>
                    Oils and Venegar
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget8"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget9"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget9"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={refrigerator} alt="icon" />
                    </span>
                    Frozen Food
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget9"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  href="#catagory-widget10"
                  role="button"
                  aria-expanded={expanded}
                  aria-controls="catagory-widget10"
                >
                  <div className="d-flex align-items-center">
                    <span className="icon">
                      <img src={honey} alt="icon" />
                    </span>
                    Jam & Honey
                  </div>
                  <i className="fas fa-angle-down"></i>
                </a>
                <ul
                  className={`catagory-submenu collapse ${
                    expanded === true && "show"
                  }`}
                  id="catagory-widget10"
                >
                  <li>
                    <a href="/">Artichoke.</a>
                  </li>
                  <li>
                    <a href="/">Aubergine (eggplant).</a>
                  </li>
                  <li>
                    <a href="/">Asparagus.</a>
                  </li>
                  <li>
                    <a href="/">Broccoflower (a hybrid).</a>
                  </li>
                  <li>
                    <a href="/">Broccoli (calabrese).</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
