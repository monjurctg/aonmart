import * as Types from "../Type/Types";

const initialState = {
    isLoading: false,
    ourProductList: [],
    productDetails: null,
    loadingDetails: false,

}
function OurProductReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_OWN_PRODUCT_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                ourProductList: action.payload.data,
            }
        case Types.GET_PRODUCT_DETAILS:
            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                productDetails: action.payload.data,
            }
        default:
            break;
    }
    return state;
}
export default OurProductReducer;