import * as Types from "../Types/Types";

const initialState = {
  websiteInfo      : null,
  isLoading        : false,
};

const WebsiteInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_WEBSITE_INFO:
      return {
        ...state,
        websiteInfo: action.payload.websiteInfo,
        isLoading  : action.payload.isLoading,
      };

    default:
      return {
        ...state,
      };
      break;
  }
};

export default WebsiteInformationReducer;
