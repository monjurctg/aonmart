import * as Types from "../Types/Types";

const initialState = {
  userData    : null,
  access_token: null,
  isLogOut    : false,
  isLoggedIn  : false,
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USER_STORAGE_DATA:
      return {
        ...state,
        userData    : action.payload.userData,
        access_token: action.payload.access_token,
        redirectTo  : action.payload.redirectTo,
      };
    case Types.LOGOUT_USER:
      return {
        ...state,
        isLogOut: action.payload,
      };

    default:
      return {
        ...state,
      };
      break;
  }
};

export default UserDataReducer;
