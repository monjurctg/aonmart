import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProductBannerList } from "./_redux/Action/ProductBannerAction";

const ProductBanner = () => {
  const dispatch = useDispatch();
  const productBannerList = useSelector(
    (state) => state.ProductBannerReducer.productBannerList
  );

  useEffect(() => {
    dispatch(getProductBannerList());
  }, []);

  // console.log('productBannerList', productBannerList)
  return (
    <React.Fragment>
      <div className="order_system_container mb-4">
        <div className="order_system_heading_title text-center">
          <h3>How to Order from AonMart?</h3>
        </div>
      </div>
      <Carousel>
        {typeof productBannerList !== "undefined" &&
          productBannerList.length > 0 &&
          productBannerList.map((item, index) => (
            <Carousel.Item interval={2000} key={index + 1}>
              <img
                className="banner-img d-block w-100"
                
                style={{ height: "350px" }}
                src={item.image}
                alt="First slide"
              />
              {/* <Carousel.Caption className="custom_product_carousel">
                                <h6 className="product_banner_carousel_title">{item.title}</h6>
                                <h2 className="product_banner_carousel_subtitle">{item.subTitle1}<br />{item.subtitle2}</h2>
                                <SimpleButton text="Read More" style={{ fontWeight: "bold" }} />
                            </Carousel.Caption> */}
            </Carousel.Item>
          ))}
      </Carousel>
    </React.Fragment>
  );
};

export default ProductBanner;
