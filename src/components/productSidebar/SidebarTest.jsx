import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Nav, Sidenav} from "rsuite";
import Dropdown from "../Dropdown/Dropdown";
import {getLocalSearchInfo} from "../Location&Store/_redux/action/Location&StoreAction";
import {getProductCategory} from "./_redux/Action/ProductSidebarAction";

function SidebarTest({isMenuOpen}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.ProductSidebarReducer.categoryList
  );

  console.log(`categoryList>>>`, categoryList);

  let shorted_category;
  if (categoryList) {
    shorted_category = categoryList.slice(0);
    shorted_category.sort(function (a, b) {
      var x = a.name;
      var y = b.name;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  // console.log('by shorted_category:');
  // console.log(shorted_category);

  const LocalSearchInfo = useSelector(
    (state) => state.LocationStoreReducer.LocalSearchInfo
  );

  useEffect(() => {
    dispatch(getLocalSearchInfo());
  }, []);

  useEffect(() => {
    dispatch(getProductCategory());
  }, [LocalSearchInfo]);

  const handleRedirectToSubCategory = (menu) => {
    history.push(`/sub-category/${menu.id}`);
  };

  const handleRedirectToSubSubCategory = (subMenu) => {
    history.push(`/sub-sub-category/${subMenu.id}`);
  };

  return (
    <div>
      <div
        // style={{ width: 250 }}
        className={`${
          isMenuOpen
            ? "product_sidebar_menu catagory-sidebar-area fixed-totop"
            : "sideBarOpen product_sidebar_menu catagory-sidebar-area fixed-totop"
        }`}>
        <div className="catagory-sidebar-area-inner">
          <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1">
            <Sidenav.Body className="bg-white">
              <Nav>
                {typeof categoryList !== "undefined" &&
                  categoryList.length > 0 &&
                  shorted_category.map((menu, index) => (
                    <React.Fragment key={index + 1}>
                      {menu.sub_categories.length !== 0 &&
                      menu.sub_categories !== "undefined" ? (
                        <Dropdown
                          menu={menu}
                          redirectSubCategory={handleRedirectToSubCategory}
                          redirectSubSubCategory={
                            handleRedirectToSubSubCategory
                          }
                        />
                      ) : (
                        <Nav.Item
                          eventKey={menu.id}
                          icon={
                            <img
                              src={menu.icon}
                              alt={menu.name}
                              className="product_sidebar_icon"
                            />
                          }
                          onClick={() => handleRedirectToSubCategory(menu)}>
                          {menu.name}
                        </Nav.Item>
                      )}
                    </React.Fragment>
                  ))}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      </div>
    </div>
  );
}

export default SidebarTest;
