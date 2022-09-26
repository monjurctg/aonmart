import * as Types from "../types/Types";

const initialState = {
  loadingDivision: false,
  divisionList: [],
  divisionAPIData: [],
  loadingDistrict: false,
  districtList: [],
  loadingUpzila: false,
  upzilaList: [],
};
function LocationReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_DIVISION_LIST:
      return {
        loadingDivision: action.payload.isLoading,
        divisionAPIData: action.payload.data,
        divisionList: getDivision(action.payload.data),
      };
    case Types.GET_DISTRICT_LIST:
      return {
        loadingDistrict: action.payload.isLoading,
        districtList: getDistrict(action.payload.data),
      };
    case Types.GET_UPZILA_LIST:
      return {
        loadingUpzila: action.payload.isLoading,
        upzilaList: getUpzila(action.payload.data),
      };
    default:
      break;
  }
  return state;
}

// division list
const getDivision = async (data) => {
  let options = [];
  if (data.length > 0) {
    data.forEach((item) => {
      let itemData = {
        value: item.id,
        label: item.name,
      };
      options.push(itemData);
    });
  }
  return options;
};

// districtList list
const getDistrict = (data) => {
  let options = [];
  if (data.length > 0) {
    data.forEach((item) => {
      let itemData = {
        value: item.id,
        label: item.name,
      };
      options.push(itemData);
    });
  }
  return options;
};

// upzila list
const getUpzila = async (data) => {
  console.log(data, "data from m");

  let options = [];
  if (data.length > 0) {
    data?.forEach((item) => {
      let itemData = {
        value: item.id,
        label: item.name,
      };
      options.push(itemData);
    });
  }
  return options;
};

export default LocationReducer;
