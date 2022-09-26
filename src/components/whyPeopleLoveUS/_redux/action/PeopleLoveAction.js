import Axios from 'axios';
import * as Types from "../type/Types";

export const getPeopleChooseUsData = () => (dispatch) => {
    const data = [
        {
            title: "Convenient & Quick",
            description: "No waiting in traffic, no haggling, no worries carrying groceries, they're delivered right at your door.",
            image: "https://thumbs.dreamstime.com/b/delivery-man-stand-holding-goods-parcel-front-motorbike-going-to-fast-express-deliver-food-product-customer-175076956.jpg"
        },
        {
            title: "Freshly Picked",
            description: "Our fresh produce is sourced every morning, you get the best from us.",
            image: "https://www.londis.co.uk/themes/custom/londisconsumer/images/ownLabel/farmFreshProductImage.png"
        },
        {
            title: "A wide range of Products",
            description: "With 4000+ Products to choose from, forget scouring those aisles for hours.",
            image: "https://www.lsretail.com/hubfs/BLOG_supermarket-retail-physical-store.jpg"
        },
    ]
    dispatch({type: Types.GET_PEOPLE_CHOOSE_DATA, payload: data});
}