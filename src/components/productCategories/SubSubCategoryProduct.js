import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  getSubSubCategoriesProducts
} from "./_redux/Action/ProductCategoriesAction";
import CategoryCard from "./partials/CategoryCard";
import { Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import ProductMiniCard from "../productMiniCard/ProductMiniCard";
import ItemNotFound from "../master/itemNotFound/ItemNotFound";

const SubSubCategoryProduct = ({ id }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loadingSubSubCategory = useSelector(
    (state) => state.ProductCategoryReducer.loadingSubSubCategory
  );

  const subSubParent = useSelector(
    (state) => state.ProductCategoryReducer.subSubParent
  );

  const categoriesSubSubProducts = useSelector((state)=> state.ProductCategoryReducer.categoriesSubSubProducts)

  useEffect(()=>{
    dispatch(getSubSubCategoriesProducts(id))
  },[id])

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
      <div className="sub_category py-5">
        <div className="sub_category_container container">

          {typeof categoriesSubSubProducts !== "undefined" &&
            categoriesSubSubProducts !== null &&
            categoriesSubSubProducts.length > 0 && (
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
                <div className="row ">
                  {categoriesSubSubProducts.map((item, index) => (
                    <ProductMiniCard product={item} key={index + 1} />
                  ))}
                </div>
              </>
            )}

          {loadingSubSubCategory === true && <SimpleLoading type="spokes" />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubSubCategoryProduct;
