import Axios from "axios";
import {selectStorModal} from "../../../../_redux/_global_store/action/GlobalAction";
import * as Types from "../type/Types";
import {showToast} from "./../../../master/Helper/Notification";
// const baseUrl = process.env.REACT_APP_API_URL;

export const handleChangeSearchLocation = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({type: Types.HANDLE_CHANGE_SEARCH_STORE, payload: formData});
};

export const storeSearchLocationData = (searchStoreInput) => (dispatch) => {
  let newSearchData = searchStoreInput;
  if (newSearchData.locationID !== null && newSearchData.locationID !== "") {
    newSearchData.location = {
      label: newSearchData.locationName,
      value: newSearchData.locationID,
    };
  }
  //  else {
  //     showToast('error', "At first select your location!");
  //     return false;
  // }
  if (newSearchData.storeID !== null && newSearchData.storeID !== "") {
    newSearchData.store = {
      label: newSearchData.storeName,
      value: newSearchData.storeID,
    };
  } else {
    // showToast("error", "Please select a store first!");
    return false;
  }

  localStorage.setItem("storeInformation", JSON.stringify(newSearchData));
  dispatch(getLocalSearchInfo());
};

export const getLocalSearchInfo = () => (dispatch) => {
  const SearchInfo = JSON.parse(localStorage.getItem("storeInformation"));
  dispatch({type: Types.GET_LOCAL_SEARCH_DATA, payload: SearchInfo});
};

/**
 * @param {latitute} float value
 * @param {longitute} float value
 * @param {divisionID} int value
 * @returns getStoreList
 */
export const getStoreList =
  (lat = null, lng = null, division_id = null) =>
  (dispatch) => {
    const responseData = {
      isLoading: true,
      storeList: [],
      status: false,
    };
    dispatch({type: Types.GET_STORE_LIST, payload: responseData});
    // let storeAPI = `stores`;
    let storeAPI = `/stores`;
    console.log(storeAPI, "storeAPI");

    // if (typeof lat !== "undefined" && lat !== null && division_id !== "" && typeof lng !== "undefined" && lng !== null && division_id !== "") {
    //     storeAPI += `?lat=${lat}&lng=${lng}`
    // }

    // if (typeof division_id !== "undefined" && division_id !== null && division_id !== "") {
    //     storeAPI += `&division_id=${division_id}`
    // }

    Axios.get(storeAPI, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res, "res from store");

        responseData.storeList = res.data.data;
        responseData.isLoading = false;
        responseData.status = true;
        dispatch({type: Types.GET_STORE_LIST, payload: responseData});
      })
      .catch((error) => {
        responseData.storeList = [];
        responseData.isLoading = false;
        responseData.status = true;
        dispatch({type: Types.GET_STORE_LIST, payload: responseData});
      });
  };
// export const getStoreList = (lat = null, lng = null, division_id = null) => (dispatch) => {
//     const responseData = {
//         isLoading: true,
//         storeList: [],
//         status: false,
//     }
//     dispatch({ type: Types.GET_STORE_LIST, payload: responseData });
//     // let storeAPI = `stores`;
//     let storeAPI = `stores`;

//     if (typeof lat !== "undefined" && lat !== null && division_id !== "" && typeof lng !== "undefined" && lng !== null && division_id !== "") {
//         storeAPI += `?lat=${lat}&lng=${lng}`
//     }

//     if (typeof division_id !== "undefined" && division_id !== null && division_id !== "") {
//         storeAPI += `&division_id=${division_id}`
//     }

//     Axios.get(storeAPI, {
//         headers: {
//             'Accept': 'application/json'
//         }
//     })
//         .then((res) => {
//             responseData.storeList = res.data.data;
//             responseData.isLoading = false;
//             responseData.status = true;
//             dispatch({ type: Types.GET_STORE_LIST, payload: responseData });
//         }).catch((error) => {
//             responseData.storeList = [];
//             responseData.isLoading = false;
//             responseData.status = true
//             dispatch({ type: Types.GET_STORE_LIST, payload: responseData });
//         })
// }
