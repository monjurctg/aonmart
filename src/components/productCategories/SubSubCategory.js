import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  categoryProductFilter,
  getMainSubSubCategory,
  getSubCategoriesProducts,
} from "./_redux/Action/ProductCategoriesAction";
import CategoryCard from "./partials/CategoryCard";
import {Breadcrumb} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import ItemNotFound from "../master/itemNotFound/ItemNotFound";

const SubSubCategory = ({id}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loadingSubSubCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubSubCategory
  );
  const subSubCategoryList = useSelector(
    (state) => state.ProductCategoryReducer.subSubCategoryList
  );
  const subSubParent = useSelector(
    (state) => state.ProductCategoryReducer.subSubParent
  );
  const categoriesFilterProduct = useSelector(
    (state) => state.ProductCategoryReducer.categoriesFilterProduct
  );

  useEffect(() => {
    dispatch(getMainSubSubCategory(id));
  }, [id]);

  const categoriesSubProducts = useSelector(
    (state) => state.ProductCategoryReducer.categoriesSubProducts
  );

  useEffect(() => {
    dispatch(getSubCategoriesProducts(id));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    : "Category Name"}
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
          {typeof categoriesSubProducts !== "undefined" &&
            categoriesSubProducts !== null &&
            categoriesSubProducts.length > 0 && (
              <>
                {/* <div className="section-heading py-3">
                  <h4 className="heading-title">
                    <span className="heading-circle green"></span>
                    {typeof subSubParent !== "undefined" &&
                    subSubParent !== null &&
                    subSubParent !== ""
                      ? `${subSubParent.name} Related Product`
                      : "Related Product"}
                  </h4>
                </div> */}
                <div className="row">
                  {categoriesSubProducts.map((item, index) => (
                    <ProductMiniCard product={item} key={index + 1} />
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubSubCategory;
