import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { customSlickSetting } from "../master/utlits/CustomeSlickSetting";
import { getProductBrandList } from "./_redux/Action/ProductBrandListAction";

const ProductBrandList = () => {
  const dispatch = useDispatch();
  const brandList = useSelector(
    (state) => state.ProductBrandListReducer.brandList
  );
  const slider = React.useRef(null);

  useEffect(() => {
    dispatch(getProductBrandList());
  }, []);

  return (
    <>
      <section className="catagory-section py-md-5 py-3">
        <div className="p-lg-0 container">
          <div className="section-heading">
            <h4 className="heading-title">
              <span className="heading-circle"></span> Featured Products
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
              {brandList.lenght !== 0 &&
                brandList.map((item, index) => (
                  <div className="p-2" key={index + 1}>
                    <div
                      className="shadow-sm p-3 bg-white rounded product_brand_card"
                      key={index + 1}
                    >
                      <img
                        src={item.brandLogo}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxHeight: "100px" }}
                      />
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductBrandList;
