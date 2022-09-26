import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import ItemNotFound from "../master/itemNotFound/ItemNotFound";
import SimpleLoading from "../master/simpleLoading/SimpleLoading";
import ProductHorizantalCard from "../productMiniCard/ProductHorizantalCard";
import {getUserWishlist} from "./_redux/action/WishlistAction";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.WishlistReducer.wishlist);
  const isLoading = useSelector((state) => state.WishlistReducer.isLoading);

  useEffect(() => {
    dispatch(getUserWishlist());
  }, []);

  return (
    <div className="dashboard-body">
      <div className="dashboard_body_header">
        <h6>My Wishlist</h6>
      </div>
      <div className="wish-list-container">
        {isLoading === true && (
          <div className="p-3">
            <SimpleLoading type="spokes" />
          </div>
        )}
        {typeof wishlist !== "undefined" &&
          wishlist !== null &&
          wishlist.length > 0 &&
          wishlist.map((item, index) => (
            <ProductHorizantalCard product={item} />
          ))}
        {isLoading === false && wishlist.length === 0 && (
          <ItemNotFound title="Wishlist" />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
