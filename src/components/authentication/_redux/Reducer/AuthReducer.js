import * as Types from "../Type/Types";

const initialState = {
  loginInput: {
    mobile: "",
    password: "",
  },
  registerInput: {
    name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  isLoggedIn: false,
  userData: {},
  tokenData: "",
  loginMessage: "",
  registerMessage: "",
  isRegistering: false,
  isLoadingRegister: false,
  registrationStatus: false,
  redirected_route: null,
  loginLoading: false,
  isLogging: false,
  isLogOut: false,
  isRegSuccess: false,
};
function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_INPUT_CHANGE:
      const loginInput = {...state.loginInput};
      loginInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        loginInput,
      };
    case Types.REGISTER_INPUT_CHANGE:
      const registerInput = {...state.registerInput};
      registerInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        registerInput,
      };
    case Types.USER_REGISTRATION:
      return {
        ...state,
        isRegistering: action.payload.isLoading,
        registerInput: initialState.registerInput,
      };
    case Types.REG_SUCCESS:
      return {
        ...state,
        isRegSuccess: action.payload,
      };
    case Types.AUTH_LOGIN_CHECK:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userData: action.payload.userData,
        tokenData: action.payload.tokenData,
        loginMessage: action.payload.loginMessage,
        isLoading: action.payload.isLoading,
        isLogging: action.payload.isLogging,
      };
    case Types.LOGOUT_USER:
      return {
        ...state,
        isLogOut: action.payload,
      };
    default:
      break;
  }
  return state;
}
export default AuthReducer;
