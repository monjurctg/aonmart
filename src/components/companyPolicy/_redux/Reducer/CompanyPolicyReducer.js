import * as Types from "../Type/Types";

const initialState   = {
    isLoading        : false,
    companyPolicyList: [],

}
function CompanyPolicyReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_COMPANY_POLICY:
            return {
                isLoading        : false,
                companyPolicyList: action.payload,
            }
        default:
            break;
    }
    return state;
}
export default CompanyPolicyReducer;