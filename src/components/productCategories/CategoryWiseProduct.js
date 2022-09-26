import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubSubCategoryWiseProduct } from "./_redux/Action/ProductCategoriesAction";
import ProductMiniCard from "./../productMiniCard/ProductMiniCard";
import SimpleLoading from "./../master/simpleLoading/SimpleLoading";
import ItemNotFound from "./../master/itemNotFound/ItemNotFound";

const CategoryWiseProduct = ({ id }) => {
  const dispatch = useDispatch();
  const loadingSubSubcategoryProduct = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubSubcategoryProduct
  );
  const subSubCategoryProductList = useSelector(
    (state) => state.ProductCategoryReducer.subSubCategoryProductList
  );

  useEffect(() => {
    dispatch(getSubSubCategoryWiseProduct(id));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      {typeof subSubCategoryProductList !== "undefined" &&
        subSubCategoryProductList !== null && (
          <>
            <img
              src={subSubCategoryProductList.cover_image}
              alt={subSubCategoryProductList.name}
              className="category_cover_img"
            />

            <div className="sub_category">
              <div className="sub_category_container container">
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div className="section-heading py-3">
                      <h4 className="heading-title">
                        <span className="heading-circle green"></span>
                        {subSubCategoryProductList.name
                          ? subSubCategoryProductList.name
                          : "Category Name"}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {subSubCategoryProductList.products.length > 0 &&
                    subSubCategoryProductList.products.map((item, index) => (
                      <ProductMiniCard product={item} key={index + 1} />
                    ))}
                  {!loadingSubSubcategoryProduct &&
                    subSubCategoryProductList.products.length === 0 && (
                      <div className="col-md-12">
                        <ItemNotFound title="Sub Subcategory Produuct" />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        )}
      <div className="sub_category">
        <div className="sub_category_container container">
          {loadingSubSubcategoryProduct === true && (
            <SimpleLoading type="spokes" />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryWiseProduct;
