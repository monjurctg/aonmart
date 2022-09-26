import * as Types from "../type/Types";
import {toCapitalized} from "./../../../master/utlits/LetterFormat";

const initialState = {
  searchStoreInput: {
    locationID: "",
    storeID: "",
    locationName: "",
    storeName: "",
    location: null,
    store: null,
  },
  LocalSearchInfo: null,
  storeList: [],
  loadingStore: false,
};
function LocationStoreReducer(state = initialState, action) {
  switch (action.type) {
    case Types.HANDLE_CHANGE_SEARCH_STORE:
      const searchStoreInput = {...state.searchStoreInput};
      searchStoreInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        searchStoreInput,
      };
    case Types.GET_LOCAL_SEARCH_DATA:
      return {
        ...state,
        LocalSearchInfo: action.payload,
      };
    case Types.GET_STORE_LIST:
      return {
        ...state,
        loadingStore: action.payload.isLoading,
        storeList: getStore(action.payload.storeList),
      };
    default:
      break;
  }
  return state;
}

// store list
const getStore = (data) => {
  let options = [];
  if (data.length > 0) {
    data.forEach((item) => {
      let itemData = {
        value: item.id,
        label: toCapitalized(item.name),
      };
      options.push(itemData);
    });
  }
  return options;
};

export default LocationStoreReducer;
