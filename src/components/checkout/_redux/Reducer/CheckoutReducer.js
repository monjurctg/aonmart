import * as Types from "../Type/Types";

const initialState = {
    isLoading: false,
   

} 
function CheckoutReducer(state = initialState, action) {
    switch (action.type) {
        case Types.PLACE_ORDER:
            return {
               
                isLoading: action.payload.isLoading,
                
            }
        default:
            break;
    }
    return state;
}


export default CheckoutReducer;