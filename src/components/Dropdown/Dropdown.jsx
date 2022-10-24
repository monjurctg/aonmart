import React, {useEffect, useState} from "react";

import "./dropdown.css";
function Dropdown({redirectSubCategory, redirectSubSubCategory, menu}) {
  const [open, setOpen] = useState(window.localStorage.getItem("drop"));
  const [openSub, setOpenSub] = useState(
    window.localStorage.getItem("sub-drop")
  );

  const handleDropDown = () => {
    redirectSubCategory(menu);
    let route = window.localStorage.setItem(
      "drop",
      open == menu.id ? "" : menu.id
    );
    window.localStorage.setItem("sub-drop", "");
    // dispatch(handleDropOpen(!isDropdwonOpen));
    setOpen(route);
  };

  useEffect(() => {
    const openRoute = window.localStorage.getItem("drop");

    setOpen(openRoute ?? null);
  }, [open]);
  // useEffect(() => {

  // }, []);
  const handleSubDrop = (id) => {
    let route = window.localStorage.setItem(
      "sub-drop",
      openSub == id ? "" : id
    );
    setOpenSub(route);
  };

  useEffect(() => {
    const openRoute = window.localStorage.getItem("sub-drop");

    setOpenSub(openRoute ?? null);
  }, [openSub]);

  let subMenu = menu.sub_categories.map((menu2, index2) => (
    <>
      <li onClick={() => redirectSubSubCategory(menu2)}>
        {menu2.sub_sub_categories.length > 0 ? (
          <>
            <div
              className=" sub-sub-category"
              onClick={() => handleSubDrop(menu2.id)}>
              <div className="d-flex">
                <img
                  src={menu2.icon}
                  alt={menu2.name}
                  className="product_sidebar_icon"
                />
                <p className="name" style={{color: "black"}}>
                  {menu2.name}
                </p>
              </div>
              <p className="icon">
                <i class="fa-solid fa-chevron-down"></i>
              </p>
            </div>
            <div
              className={`sub-list ${
                openSub == menu2.id ? "d-block" : "d-none"
              }`}>
              {menu2.sub_sub_categories.map((menu3, index3) => (
                <li className="sub-category">{menu3.name}</li>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="sub-category">{menu2.name}</div>
          </>
        )}
      </li>
    </>
  ));
  return (
    <div className="dropdown-container">
      <div className="single-drop" onClick={handleDropDown}>
        <div className="d-flex">
          <img
            src={menu.icon}
            alt={menu.name}
            className="product_sidebar_icon"
          />
          <p className="name" style={{color: "black"}}>
            {menu.name}
          </p>
        </div>
        <p className="icon">
          <i class="fa-solid fa-chevron-down"></i>
        </p>
      </div>
      <div
        className={`dropList d-none ${
          open == menu.id ? "dropListShow d-block" : ""
        }`}>
        {subMenu}
      </div>
    </div>
  );
}

export default Dropdown;
