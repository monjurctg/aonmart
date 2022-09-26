import * as Types from "../type/Types";

const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null
}
function OrderReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_ORDER_LIST:
            return { 
                ...state,
                isLoading: action.payload.isLoading,
                orderList: action.payload.data
            };
        case Types.GET_ORDER_DETAILS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                orderDetails: action.payload.data
            };
     
        default:
            break;
    }
    return state;
}
export default OrderReducer;