import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const CategoryCard = ({ item, path }) => {
  const location = useLocation();
  const history = useHistory();

  const redirectToSubCategoryPage = (item) => {
    if (path) {
      history.push(`/${path}/${item.id}`);
    } else {
      return false;
    }
  };

  return (
    <div className="col-lg-3 col-3 col-sm-4 col-6 my-2" key={item.id}>
      <div
        className="category_item_card"
        onClick={() => redirectToSubCategoryPage(item)}
      >
        <img
          src={item.icon}
          alt={item.name}
          className="sub_category_card_img"
        />
        <p className="sub_category_title">{item.name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
