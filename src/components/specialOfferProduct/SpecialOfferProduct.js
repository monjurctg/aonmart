/** @format */

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { customProductSlickSetting } from "../master/utlits/CustomeProductSlickSetting";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import { getRecommendProductList } from "./_redux/Action/SpecialOfferProductAction";
import SlickProductCard from "./../productMiniCard/SlickProductCard";

const SpecialOfferProduct = () => {
  const dispatch = useDispatch();
  const recommendProductList = useSelector(
    (state) => state.RecommendProductReducer.recommendProductList
  );
  const slider = React.useRef(null);

  useEffect(() => {
    dispatch(getRecommendProductList());
  }, []);

  return (
    <>
      <div className='special_offer_container'>
        <button
          className='special_offer_prev_slick'
          onClick={() => slider?.current?.slickPrev()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className='special_offer_next_slick'
          onClick={() => slider?.current?.slickNext()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className='container'>
          <div className='text-center'>
            <h3>Special Products</h3>
          </div>
          <Slider ref={slider} {...customProductSlickSetting}>
            {recommendProductList.lenght !== 0 &&
              recommendProductList.map((item, index) => (
                <div key={index + 1}>
                  <SlickProductCard
                    product={item}
                    key={index + 1}
                    style={{ margin: "15px" }}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferProduct;
