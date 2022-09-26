import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductMainCategoryList } from "./_redux/Action/ProductCategoriesAction";
import Slider from "react-slick";
import { customSlickSetting } from "../master/utlits/CustomeSlickSetting";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const ProductCategories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productCategoryList = useSelector(
    (state) => state.ProductCategoryReducer.productCategoryList
  );
  const loadingCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingCategory
  );
  const slider = React.useRef(null);

  useEffect(() => {
    dispatch(getProductMainCategoryList());
  }, []);

  const redirectToSubCategoryPage = (item) => {
    localStorage.setItem("category_item", JSON.stringify(item));
    history.push(`/sub-category/${item.id}`);
  };
    
  return (
    <>
      <section className="catagory-section py-md-5 py-3">
        <div className="container p-lg-0">
          <div className="section-heading">
            <h4 className="heading-title">
              <span className="heading-circle green"></span> Products Catagories
            </h4>
            <div className="btn_group">
              <button
                className="custom_slick_prev_btn"
                onClick={() => slider?.current?.slickPrev()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="custom_slick_next_btn"
                onClick={() => slider?.current?.slickNext()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className="product_categories_list_slider">
            <Slider ref={slider} {...customSlickSetting}>
              {productCategoryList &&
                productCategoryList.length > 0 &&
                productCategoryList.map((item, index) => (
                  <div className="p-2">
                    <div
                      className="shadow-sm p-2 bg-white rounded product_category_card"
                      key={item.id}
                      onClick={() => redirectToSubCategoryPage(item)}
                    >
                      <div className="p-2 product_category_list_logo">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="img-fluid"
                        />
                      </div>
                      <p className="category_list_title">{item.name}</p>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
          {loadingCategory === true && <SimpleLoading type="spokes" />}
        </div>
      </section>
    </>
  );
};

export default ProductCategories;
