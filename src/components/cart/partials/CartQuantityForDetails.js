import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { showToast } from '../../master/Helper/Notification';
import { addToCartAction, updateCartQtyAction } from "../_redux/action/CartAction";
 
const CartQuantityForDetails = ({ cart, item,stock,quantity,setQuantity }) => {
    const dispatch = useDispatch();
    // const [quantity, setQuantity] = useState(0)

    const updateQuantity = (qty) => {
        if(qty <= stock){

            if (typeof cart !== "undefined" && cart !== null && cart !== "") {
            // console.log('cart 1')

                setQuantity(qty);
                dispatch(updateCartQtyAction(cart.product_id, qty));
            }else {
            // console.log('cart 2')

                setQuantity(qty);
                // console.log(item)
                dispatch(addToCartAction(item, {qty}))
            }
        }else{
    showToast('error', 'Can not add more then stock !')

        }
    }


    useEffect(() => {
        if (typeof cart !== "undefined" && cart !== null && cart !== "") {
            setQuantity(cart.quantity)
        } else {
            setQuantity(quantity);
        }
    }, [cart]);

    return (

        <div className="price-increase-decrese-group d-flex">
            <span className="decrease-btn">
                <button type="button" className="btn quantity-left-minus pointer" data-type="minus" data-field="" disabled={quantity === 0? true:false} onClick={() => updateQuantity(quantity - 1)}> -
                </button>
            </span>
            <input
                type="text"
                name="quantity"
                className="form-controls input-number"
                value={quantity}
            />
            <span className="increase" onClick={() => updateQuantity(quantity + 1)}>
                <button type="button" className="btn quantity-right-plus" data-type="plus" data-field="">+
                </button>
            </span>
        </div>
    );
}

export default CartQuantityForDetails;