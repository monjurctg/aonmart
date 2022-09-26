import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import CategoryCard from "./partials/CategoryCard";
import { getMainSubCategoryList } from "./_redux/Action/ProductCategoriesAction";
import { useLocation } from "react-router-dom";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import ItemNotFound from "../master/itemNotFound/ItemNotFound";

const SubCategory = ({ id }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const loadingSubCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubCategory
  );
  const productSubCategoryList = useSelector(
    (state) => state.ProductCategoryReducer.productSubCategoryList
  );
  const subParent = useSelector(
    (state) => state.ProductCategoryReducer.subParent
  );
  const categoriesFilterProduct = useSelector(
    (state) => state.ProductCategoryReducer.categoriesFilterProduct
  );

  useEffect(() => {
    dispatch(getMainSubCategoryList(id));
  }, [id]);


  return (
    <React.Fragment>
      {typeof subParent !== "undefined" && subParent !== null && (
        <img
          src={subParent.cover_image}
          alt={subParent.name}
          className="category_cover_img"
        />
      )}
      <div className="sub_category">
        <div className="sub_category_container container">
          {/* <div className="row">
                        <div className="col-12 col-md-12">
                            <div className="section-heading py-3">
                                <h4 className="heading-title"><span className="heading-circle green"></span>
                                    {
                                        (typeof subParent !== "undefined" && subParent !== null) ? subParent.name : "Category"
                                    }
                                </h4>
                            </div>
                            {
                                !loadingSubCategory && productSubCategoryList.length === 0 && (
                                    <ItemNotFound title="Category" />
                                )
                            }
                        </div>

                        {
                            productSubCategoryList && productSubCategoryList.length > 0 && productSubCategoryList.map((item, index) => (
                                <CategoryCard item={item} path="sub-sub-category" />
                            ))
                        }

                    </div> */}

          {typeof productSubCategoryList !== "undefined" &&
            productSubCategoryList !== null &&
            productSubCategoryList.length > 0 && (
              <>
                <div className="section-heading py-3">
                  <h4 className="heading-title">
                    <span className="heading-circle green"></span>
                    {typeof subParent !== "undefined" && subParent !== null
                      ? `${subParent.name} Related Product`
                      : "This Category Related Product"}
                  </h4>
                </div>
                <div className="row">
                  {productSubCategoryList.map((item, index) => (
                    <ProductMiniCard product={item} key={index + 1} />
                  ))}
                </div>
              </>
            )}

          {loadingSubCategory === true && <SimpleLoading type="spokes" />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubCategory;
