import * as Types from "../type/Types";

const initialState = {
    peopleChooseData: []
}
function PeopleLoveReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PEOPLE_CHOOSE_DATA:
            return {
                ...state,
                peopleChooseData: action.payload
            };
        default:
            break;
    }
    return state;
}

export default PeopleLoveReducer;