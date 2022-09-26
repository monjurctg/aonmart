import * as Types from "../Type/Types";

const initialState = {
    isLoading: false,
    brandList: [],

}
function ProductBrandListReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PRODUCT_BRAND_LIST:
            return {
                isLoading: false,
                brandList: action.payload,
            }
        default:
            break;
    }
    return state;
}
export default ProductBrandListReducer;