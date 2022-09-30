import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Dropdown, Icon, Nav, Sidenav} from "rsuite";
import "./SidebarMenu.css";
import {getProductCategory} from "./_redux/Action/ProductSidebarAction";

const SidebarMenu = ({isMenuOpen, setIsMenuOpen}) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.ProductSidebarReducer.categoryList
  );

  useEffect(() => {
    dispatch(getProductCategory());
  }, []);

  return (
    <>
      <div
        style={{width: 250}}
        className="product_sidebar_menu catagory-sidebar-area fixed-totop">
        <div className="catagory-sidebar-area-inner">
          <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1">
            <Sidenav.Body className="bg-white">
              <Nav>
                {typeof categoryList !== "undefined" &&
                  categoryList.length > 0 &&
                  categoryList.map((menu, index) => (
                    <>
                      {menu.subcategories.length !== 0 ? (
                        <Dropdown
                          eventKey={index + 1}
                          title={menu.category_name}
                          icon={
                            <img
                              src={menu.category_icon}
                              alt={menu.category_name}
                              className="product_sidebar_icon"
                            />
                          }
                          key={index + 1}>
                          {menu.subcategories.map((menu2, index2) =>
                            menu2.sub_subcategories.length > 0 ? (
                              <Dropdown.Menu
                                eventKey={menu2.id}
                                title={menu2.subcategory_name}
                                key={index2 + 1}>
                                {/* <Link to={`/sub-category/${menu}`}>
                                                                        </Link> */}
                                {menu2.sub_subcategories.map(
                                  (menu3, index3) => (
                                    <Dropdown.Item
                                      eventKey={menu3.id}
                                      key={index3 + 1}>
                                      {menu3.sub_subcategory_name}
                                    </Dropdown.Item>
                                  )
                                )}
                              </Dropdown.Menu>
                            ) : (
                              <Dropdown.Item eventKey={menu2.id}>
                                {menu2.subcategory_name}
                              </Dropdown.Item>
                            )
                          )}
                        </Dropdown>
                      ) : (
                        <Nav.Item
                          eventKey={menu.id}
                          icon={
                            <img
                              src={menu.category_icon}
                              alt={menu.category_name}
                              className="product_sidebar_icon"
                            />
                          }>
                          {menu.category_name}
                        </Nav.Item>
                      )}
                    </>
                  ))}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
