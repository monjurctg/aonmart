import * as Types from "../Type/Types";

const initialState   = {
    isLoading        : false,
    recommendProductList: [],

}
function RecommendProductReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_RECOMMEND_PRODUCT_LIST:
            return {
                isLoading        : false,
                recommendProductList: action.payload,
            }
        default:
            break;
    }
    return state;
}
export default RecommendProductReducer;