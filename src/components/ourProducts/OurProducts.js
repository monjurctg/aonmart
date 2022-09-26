import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SimpleButton from "../master/simpleButton/SimpleButton";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import GetCurrentLocation from "../master/utlits/GetCurrentLocation";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import {getOwnProductList} from "./_redux/Action/OurProductAction";

const OurProducts = () => {
  // const isAdding = useSelector((state) => state.WishlistReducer.isAdding);
  // console.log(isAdding, "isAdding");
  const dispatch = useDispatch();
  const ourProductList = useSelector(
    (state) => state.OurProductReducer.ourProductList
  );
  // console.log(ourProductList, "ourProducList");
  const isLoading = useSelector((state) => state.OurProductReducer.isLoading);
  const [visible, setVisible] = useState(8);
  // const location = GetCurrentLocation();
  useEffect(() => {
    dispatch(getOwnProductList());
  }, []);

  const showMoreItems = () => {
    setVisible((preValue) => preValue + 4);
  };

  return (
    <>
      <section className="catagory-section py-md-5 py-3">
        <div className="container p-lg-0">
          <div className="section-heading">
            <h4 className="heading-title">
              <span className="heading-circle"></span>Our Products
            </h4>
          </div>
          {isLoading === false && ourProductList.lenght !== 0 && (
            <>
              <div className="product_categories_list_slider">
                <div className="row">
                  {ourProductList.length !== 0 &&
                    ourProductList
                      .slice(0, visible)
                      .map((item, index) => (
                        <ProductMiniCard product={item} key={index + 1} />
                      ))}
                </div>
              </div>
              {ourProductList.length > visible && (
                <div className="text-center p-3" onClick={showMoreItems}>
                  <SimpleButton
                    text="More Products"
                    style={{fontWeight: "600px"}}
                  />
                  {/* <Link to="/" className="more_products_btn"> More Products</Link> */}
                </div>
              )}
            </>
          )}

          {isLoading === true && (
            <div className="w-100 d-flex justify-content-center aling-items-center">
              <div className="test_loading">
                <SimpleLoading type="spokes" color="#1c733e" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OurProducts;
