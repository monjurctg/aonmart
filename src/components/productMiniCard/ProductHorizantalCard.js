import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../_redux/_global_store/action/GlobalAction';
import { addToCartAction, getCartsAction } from '../cart/_redux/action/CartAction';
import { ConfirmationModal } from '../master/confirmationModal/ConfirmationModal';
import SimpleModel from '../master/simpleModal/SimpleModel';
import ProductDetails from '../ourProducts/ProductDetails';
import DeleteWishlist from '../wishlist/DeleteWishlist';
import CartQuantity from './../cart/partials/CartQuantity';
import PriceCalculation from './../master/services/PriceCalculcation';

const ProductHorizantalCard = ({ product, style }) => {

    const dispatch = useDispatch();

    const { id, name, short_description, full_description, regular_price, sell_price, discount, stock, stock_out, sku, image, gallery } = product;
    const default_price = sell_price && sell_price !== 0 && sell_price !== "" && sell_price !== null ? sell_price : regular_price;

    const { carts, cartQuantity } = useSelector((state) => state.CartReducer);
    const [filterCarts, setFilterCarts] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [updatedID, setUpdatedID] = useState(null);
    const [totalAmount, setTotalAmount] = useState(default_price);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productID, setProductID] = useState(id)
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setShow(true);
        setProductID(id)
    };

    const handleToggleModal = () => {
        setProductID(id)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }


    useEffect(() => {
        dispatch(getCartsAction());
    }, []);

    useEffect(() => {
        if (product) {
            const newFilterCarts = carts.find((item) => item.productID == product.id);
            setFilterCarts(newFilterCarts);
            if (typeof newFilterCarts !== "undefined" && newFilterCarts !== null) {
                setQuantity(newFilterCarts.quantity);
                setUpdatedID(newFilterCarts.productID);
                setQuantity(newFilterCarts.quantity);
                setTotalAmount(newFilterCarts.quantity * default_price);
            }
        }

    }, [product, carts, quantity]);

    const addToCart = () => {
        dispatch(addToCartAction(product));
    };



    return (
        <React.Fragment>
            <div className="product_horizantal_card d-flex align-items-center">
                <span className="close-item"
                    onClick={() => handleToggleModal()}
                // onClick={() => ConfirmationModal(`Confirm To Delete!`, `Are you sure to delete ${name} ?`)}
                ><i className="fas fa-times"></i></span>
                <div className="thumb pointer" onClick={() => handleShow(id)}>
                    <img src={image} alt={name} className="img-fluid" />
                </div>
                <div className="product-content">
                    <span className="product-title">{name}</span>
                    <div className="product-price">
                        <PriceCalculation item={product} />
                    </div>
                    <div>
                        {
                            (typeof filterCarts !== "undefined" && filterCarts !== null) ?
                                <CartQuantity cart={filterCarts} />
                                :
                                <div className="product_cart_btn horizantal_product_cart" onClick={() => addToCart()}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Add
                                </div>

                        }
                    </div>
                </div>
            </div>
            <SimpleModel
                show={show}
                handleClose={handleClose}
                size="xl"
                onHide={() => setShow(false)}
            >
                <ProductDetails id={productID} />
            </SimpleModel>

            <SimpleModel
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                size="md"
                onHide={() => handleCloseDeleteModal}
            >
                <DeleteWishlist product={product} handleClose={handleCloseDeleteModal} />
            </SimpleModel>
        </React.Fragment>
    );
};

export default ProductHorizantalCard;