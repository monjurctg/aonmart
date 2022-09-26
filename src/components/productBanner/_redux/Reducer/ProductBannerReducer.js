import * as Types from "../Type/Types";

const initialState   = {
    isLoading        : false,
    productBannerList: [],

}
function ProductBannerReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PRODUCT_BANNER_LIST:
            return {
                isLoading        : false,
                productBannerList: action.payload,
            }
        default:
            break;
    }
    return state;
}
export default ProductBannerReducer;