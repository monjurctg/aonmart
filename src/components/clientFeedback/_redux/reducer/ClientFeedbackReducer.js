import * as Types from "../type/Types";

const initialState = {
    clientFeedback: []
}
function ClientFeedbackReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_CLIENT_FEEDBACK_DATA:
            return {
                ...state,
                clientFeedback: action.payload
            };
        default:
            break;
    }
    return state;
}

export default ClientFeedbackReducer;