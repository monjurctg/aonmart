import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import CategoryCard from "./partials/CategoryCard";
import {
  getMainSubSubCategory,
  getSubCategoriesProducts,
  setPageA
} from "./_redux/Action/ProductCategoriesAction";

const SubSubCategory = ({ id }) => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [products, setproducts] = useState([]);
  const [idNow, setidNow] = useState(id);
  const categoriesSubProducts = useSelector(
    (state) => state.ProductCategoryReducer.categoriesSubProducts
  );
  const loadingSubSubCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubSubCategory
  );
  const subSubCategoryList = useSelector(
    (state) => state.ProductCategoryReducer.subSubCategoryList
  );
  const subSubParent = useSelector(
    (state) => state.ProductCategoryReducer.subSubParent
  );

  useEffect(() => {
    dispatch(getMainSubSubCategory(id));
  }, [id]);
  useEffect(() => {
    if (categoriesSubProducts?.data && id === idNow) {
      // console.log('object :>> ');
      let margedProducts = [...products, ...categoriesSubProducts.data];
      setproducts(margedProducts);
    } else if (categoriesSubProducts?.data) {
      let margedProducts = [...categoriesSubProducts.data];
      setproducts(margedProducts);
      setidNow(id);
    }
    // dispatch(getCategoriesProducts(id,page));
  }, [categoriesSubProducts]);

  console.log('products :>> ', products);
  // console.log('categoriesSubProducts :>> ', categoriesSubProducts);
  useEffect(() => {
    dispatch(getSubCategoriesProducts(id));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let fetchMoreData = () => {
    setpage(page + 1);
    dispatch(setPageA());
    dispatch(getSubCategoriesProducts(id, page));
  };

  return (
    <React.Fragment>
      {typeof subSubParent !== "undefined" &&
        subSubParent !== null &&
        subSubParent !== "" && (
          <img
            src={subSubParent.cover_image}
            alt={subSubParent.name}
            className="category_cover_img"
          />
        )}
      <div className="sub_category pt-5">
        <div className="sub_category_container container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="section-heading">
                <h4 className="heading-title">
                  <span className="heading-circle green"></span>
                  {typeof subSubParent !== "undefined" &&
                  subSubParent !== null &&
                  subSubParent !== ""
                    ? subSubParent.name
                    : "Items"}
                </h4>
              </div>
            </div>

            {subSubCategoryList &&
              subSubCategoryList.length > 0 &&
              subSubCategoryList.map((item, index) => (
                <CategoryCard item={item} path="sub-sub-category-product" />
              ))}
            {/* <div className="col-md-12">
              {loadingSubSubCategory === false &&
                subSubCategoryList.length === 0 && (
                  <ItemNotFound title="Sub Subcategory" />
                )}
            </div> */}
          </div>
          {loadingSubSubCategory === true && <SimpleLoading type="spokes" />}
        </div>
      </div>

      <div className="product-section pt-5">
        <div className="container">
         
                <div className="row">

                  {products?.length && (
                    <InfiniteScroll
                      dataLength={products.length}
                      next={fetchMoreData}
                      // inverse={true}
                      hasMore={
                        products.length < categoriesSubProducts?.meta?.total
                      }
                      loader={<h4>Loading...</h4>}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="row">
                        {products.length > 0 &&
                          products.map((item, index) => (
                            <ProductMiniCard product={item} key={index + 1} />
                          ))}
                      </div>
                    </InfiniteScroll>
                  )}
                </div>
         
          
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubSubCategory;
