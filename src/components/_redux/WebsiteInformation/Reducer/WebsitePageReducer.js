import * as Types from "../Types/Types";

const initialState = {
  pageData : null,
  isLoading: false,
};

const WebsitePageReducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.GET_WEBSITE_PAGE:
      return {
        ...state,
        pageData : action.payload.data,
        isLoading: action.payload.loading,
      };

    default:
      return {
        ...state,
      };
  }
};

export default WebsitePageReducer;
