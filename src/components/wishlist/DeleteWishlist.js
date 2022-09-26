import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceCalculation from "../master/services/PriceCalculcation";
import SmallLoading from "../master/simpleLoading/SmallLoading";
import { removeFromWishlist } from "./_redux/action/WishlistAction";

/**
 * @param {product} object
 * @returns DeleteWishlist
 */

const DeleteWishlist = ({ product, handleClose }) => {
  const dispatch = useDispatch();
  const removeLoading = useSelector(
    (state) => state.WishlistReducer.removeLoading
  );

  const handleDeleteWishlist = () => {
    dispatch(removeFromWishlist(product.id, handleClose));
  };

  return (
    <div className="wishlist_delete_container bg-white">
      <h2 className="wishlist_delete_title">Confirm To Delete</h2>
      <div className="wishlist_delete_body">
        <div className="delete_product_img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="delete_product_text">
          <p className="delete_product_name">{product.name}</p>
          <PriceCalculation item={product} />
        </div>
      </div>
      <div className="confirmation_group p-3">
        {!removeLoading && (
          <button className="delete_btn" onClick={() => handleDeleteWishlist()}>
            Confirm
          </button>
        )}
        {removeLoading && (
          <div>
            <button
              type="submit"
              className="delete_btn d-flex justify-content-center"
              disabled={true}
            >
              <span>
                {" "}
                <SmallLoading
                  width="20px"
                  height="20px"
                  color="#fff"
                  type="spokes"
                />{" "}
              </span>
              <div className="ml-3">Deleting...</div>
            </button>
          </div>
        )}

        <button className="cancel_btn ml-3" onClick={() => handleClose()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWishlist;
