// import {
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { customProductSlickSetting } from "../master/utlits/CustomeProductSlickSetting";
// import ProductMiniCard from "../productMiniCard/ProductMiniCard";
// import { getRecommendProductList } from "./_redux/Action/RecommendProductAction";
// import SlickProductCard from "./../productMiniCard/SlickProductCard";

// const RecommendProduct = () => {
//   const dispatch = useDispatch();
//   const recommendProductList = useSelector(
//     (state) => state.RecommendProductReducer.recommendProductList
//   );
//   const slider = React.useRef(null);

//   useEffect(() => {
//     dispatch(getRecommendProductList());
//   }, []);

//   return (
//     <>
//       <section class="catagory-section py-md-5 py-3">
//         <div class="container p-lg-0">
//           <div class="section-heading">
//             <h4 class="heading-title">
//               <span class="heading-circle"></span> We Recommend You
//             </h4>
//             <div className="btn_group">
//               <button
//                 className="custom_slick_prev_btn"
//                 onClick={() => slider?.current?.slickPrev()}
//               >
//                 <FontAwesomeIcon icon={faChevronLeft} />
//               </button>
//               <button
//                 className="custom_slick_next_btn"
//                 onClick={() => slider?.current?.slickNext()}
//               >
//                 <FontAwesomeIcon icon={faChevronRight} />
//               </button>
//             </div>
//           </div>
//           <div className="product_categories_list_slider">
//             <Slider ref={slider} {...customProductSlickSetting}>
//               {recommendProductList.lenght !== 0 &&
//                 recommendProductList.map((item, index) => (
//                   <div>
//                     <SlickProductCard
//                       product={item}
//                       key={index + 1}
//                       style={{ margin: "15px" }}
//                     />
//                   </div>
//                 ))}
//             </Slider>
//           </div>
//           <div className="text-center p-3">
//             <Link to="/" className="more_products_btn">
             
//               More Products
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default RecommendProduct;


// my code

// import {
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { customProductSlickSetting } from "../master/utlits/CustomeProductSlickSetting";
// import ProductMiniCard from "../productMiniCard/ProductMiniCard";
// import { getRecommendProductList } from "./_redux/Action/RecommendProductAction";
// import SlickProductCard from "./../productMiniCard/SlickProductCard";

// const RecommendProduct = () => {
//   const dispatch = useDispatch();
//   const recommendProductList = useSelector(
//     (state) => state.RecommendProductReducer.recommendProductList
//   );
//   const slider = React.useRef(null);

//   useEffect(() => {
//     dispatch(getRecommendProductList());
//   }, []);

//   return (
//     <>
//       <section class="catagory-section py-md-5 py-3">
//         <div class="container p-lg-0">
//           <div class="section-heading">
//             <h4 class="heading-title">
//               <span class="heading-circle"></span> We Recommend You
//             </h4>
//             <div className="btn_group">
//               <button
//                 className="custom_slick_prev_btn"
//                 onClick={() => slider?.current?.slickPrev()}
//               >
//                 <FontAwesomeIcon icon={faChevronLeft} />
//               </button>
//               <button
//                 className="custom_slick_next_btn"
//                 onClick={() => slider?.current?.slickNext()}
//               >
//                 <FontAwesomeIcon icon={faChevronRight} />
//               </button>
//             </div>
//           </div>
//           <div className="product_categories_list_slider">
//             <Slider ref={slider} {...customProductSlickSetting}>
//               {recommendProductList.lenght !== 0 &&
//                 recommendProductList.map((item, index) => (
//                   <div>
//                     <SlickProductCard
//                       product={item}
//                       key={index + 1}
//                       style={{ margin: "15px" }}
//                     />
//                   </div>
//                 ))}
//             </Slider>
//           </div>
//           <div className="text-center p-3">
//             <Link to="/" className="more_products_btn">
             
//               More Products
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default RecommendProduct;
