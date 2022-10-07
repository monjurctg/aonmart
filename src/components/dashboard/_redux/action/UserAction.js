import Axios from "axios";
import { showToast } from "../../../master/Helper/Notification";
import * as Types from "../type/Types";

// const oldAPIURL = process.env.REACT_APP_OLD_API;
let baseURL = process.env.REACT_APP_API_URL;

// import { showToast } from './../../../master/Helper/Notification';

/**
 *
 * @param {name} name
 * @param {value} value
 * @returns
 */
export const handleChangeProfileUpdatedInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.HANDLE_CHANGE_PROFILE_UPDATE_INPUT,
    payload: formData,
  });
};

/**
 * Remove item from wishlist
 * @returns removeFromWishlist
 */
export const updateUserInformation =
  (updateProfileInput, handleClose) => (dispatch) => {
    let responseData = {
      isUpdating: true,
      status: false,
    };

    dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });

    const login_data = JSON.parse(localStorage.getItem("loginData"));

    if (
      typeof login_data !== "undefined" &&
      login_data !== null &&
      login_data !== ""
    ) {
      const access_token = login_data.userData.access_token;
      // const id = login_data.userData.data.id

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      };

      Axios.put(`${baseURL}/update-profile`, updateProfileInput, config)
        .then((res) => {
          if (res.status) {
            responseData.isUpdating = false;
            responseData.status = true;
            showToast("success", "Profile updated successfully!");
            dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
            dispatch(getUserInformation());
            dispatch(handleClose());
          }
        })
        .catch((error) => {
          let responseLog = error.response;
          responseData.isUpdating = false;
          if (typeof responseLog !== "undefined") {
            const { request, ...errorObject } = responseLog;
            showToast("error", responseLog.data.message);
            if (responseLog.data.error) {
              showToast("error", responseLog.data.error);
            }
            dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
          }
        });
    } else {
      showToast("error", "Please login first");
    }
  };

/**
 * dashboard user information
 *
 * @returns getUserInformation
 */
export const getUserInformation = () => (dispatch) => {
  const responseData = {
    isLoading: true,
    status: false,
    data: null,
  };

  dispatch({ type: Types.GET_USER_INFORMATION, payload: responseData });

  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (
    typeof access_token !== "undefined" &&
    access_token !== null &&
    access_token !== ""
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    };
    Axios.get(`${baseURL}/profile`, config)
      .then((res) => {
        if (res.status) {
          responseData.isLoading = false;
          responseData.status = true;
          responseData.data = res.data.data;
          dispatch({ type: Types.GET_USER_INFORMATION, payload: responseData });
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.isLoading = false;
        if (typeof responseLog !== "undefined") {
          const { request, ...errorObject } = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({ type: Types.GET_USER_INFORMATION, payload: responseData });
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};

export const handleChangePasswordInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.HANDLE_CHANGE_PASSWORD_INPUT, payload: formData });
};

/**
 * update password
 *
 * @returns updatedPassword
 */
export const updatedPassword = (passwordInput) => (dispatch) => {
  const responseData = {
    isUpdating: true,
    status: false,
    data: null,
  };

  dispatch({ type: Types.UPDATED_PASSWORD, payload: responseData });

  const login_data = JSON.parse(localStorage.getItem("loginData"));

  if (
    typeof login_data !== "undefined" &&
    login_data !== null &&
    login_data !== ""
  ) {
    const access_token = login_data.userData.access_token;
    const id = login_data.userData.id;

    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    Axios.post(`${baseURL}/update-password/${id}`, passwordInput, config)
      .then((res) => {
        if (res.status) {
          responseData.isUpdating = false;
          responseData.status = true;
          responseData.data = res.data.data;
          showToast("success", res.data.message);
          dispatch({ type: Types.UPDATED_PASSWORD, payload: responseData });
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.isUpdating = false;
        if (typeof responseLog !== "undefined") {
          const { request, ...errorObject } = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({ type: Types.UPDATED_PASSWORD, payload: responseData });
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};

export const handleChangeProfileImg =
  (name, value, e = null) =>
  (dispatch) => {
    let data = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.CHANGE_PROFILE_PHOTO_INPUT, payload: data });

    if (name === "image") {
      let reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        if (name === "image") {
          data.name = "imagePreview";
        }
        data.value = reader.result;
        dispatch({ type: Types.CHANGE_PROFILE_PHOTO_INPUT, payload: data });
      };
      reader.readAsDataURL(file);
    }
  };

export const deletePreviewImage = (name) => (dispatch) => {
  let data = {
    name: name,
    value: null,
  };
  dispatch({ type: Types.CHANGE_PROFILE_PHOTO_INPUT, payload: data });

  if (name === "image") {
    data.name = "imagePreview";
  }
  dispatch({ type: Types.CHANGE_PROFILE_PHOTO_INPUT, payload: data });
};

/**
 * update profile photo
 * @returns updateProfilePhoto
 */
export const updateProfilePhoto =
  (userProfileUpdateInput, handleClose) => (dispatch) => {
    let responseData = {
      isUpdating: true,
      status: false,
    };

    // dispatch({ type: Types.UPDATE_PROFILE_PHOTO, payload: responseData });

    const login_data = JSON.parse(localStorage.getItem("loginData"));

    // const file = userProfileUpdateInput.image.target.files[0];

    if (
      typeof login_data !== "undefined" &&
      login_data !== null &&
      login_data !== ""
    ) {
      const access_token = login_data.userData.access_token;

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      // let img = userProfileUpdateInput.image;

      let body = {
        image: userProfileUpdateInput.image,
        _method: "PUT",
      };

      Axios.post(`${baseURL}/update-profile-picture/`, body, config)
        .then((res) => {
          if (res.status) {
            responseData.isUpdating = false;
            responseData.status = true;
            showToast("success", "Profile updated successfully!");
            dispatch({
              type: Types.UPDATE_PROFILE_PHOTO,
              payload: responseData,
            });
            dispatch(getUserInformation());
            dispatch(handleClose());
          }
        })
        .catch((error) => {
          let responseLog = error.response;
          responseData.isUpdating = false;
          if (typeof responseLog !== "undefined") {
            const { request, ...errorObject } = responseLog;
            showToast("error", responseLog.data.message);
            if (responseLog.data.error) {
              showToast("error", responseLog.data.error);
            }
            dispatch({
              type: Types.UPDATE_PROFILE_PHOTO,
              payload: responseData,
            });
          }
        });
    } else {
      showToast("error", "Please login first");
    }
  };

/**
 *
 * @param {name} name
 * @param {value} value
 * @returns
 */
export const handleChangeAddressInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_ADDRESS_INPUT, payload: formData });
};

/**
 * @param {addressInput} object
 * @returns addNewAddress
 */
export const addNewAddress =
  (newAddressInput, handleClose, type) => (dispatch) => {
    let responseData = {
      isLoading: true,
      status: false,
    };

    dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });

    const login_data = JSON.parse(localStorage.getItem("loginData"));

    if (
      typeof login_data !== "undefined" &&
      login_data !== null &&
      login_data !== ""
    ) {
      const access_token = login_data.userData.access_token;
      // const id = login_data.userData.data.id

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      };

      let getAddress = newAddressInput;
      console.log('getAddress :>> ', getAddress);

      if (newAddressInput.is_default === "true") {
        getAddress.is_default = true;
      } else {
        getAddress.is_default = false;
      }

      if (type === "update") {
        Axios.put(`${baseURL}/address-update`, getAddress, config)
          .then((res) => {
            if (res.status) {
              responseData.isLoading = false;
              responseData.status = true;
              showToast("success", res.data.message);
              dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
              dispatch(getAllAdderss());
              dispatch(handleClose());
            }
          })
          .catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== "undefined") {
              const { request, ...errorObject } = responseLog;
              showToast("error", responseLog.data.message);
              if (responseLog.data.error) {
                showToast("error", responseLog.data.error);
              }
              dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
            }
          });
      } else {
        Axios.post(`${baseURL}/address-save`, getAddress, config)
          .then((res) => {
            if (res.status) {
              responseData.isLoading = false;
              responseData.status = true;
              showToast("success", res.data.message);
              dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
              dispatch(getAllAdderss());
              dispatch(handleClose());
            }
          })
          .catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== "undefined") {
              const { request, ...errorObject } = responseLog;
              showToast("error", responseLog.data.message);
              if (responseLog.data.error) {
                showToast("error", responseLog.data.error);
              }
              dispatch({ type: Types.ADD_NEW_ADDRESS, payload: responseData });
            }
          });
      }
    } else {
      showToast("error", "Please login first");
    }
  };

/**
 * @returns getAllAdderss
 */
export const getAllAdderss = () => (dispatch) => {
  let responseData = {
    isLoading: true,
    status: false,
    data: [],
  };

  dispatch({ type: Types.GET_ALL_ADDRESS_LIST, payload: responseData });

  const login_data = JSON.parse(localStorage.getItem("loginData"));

  if (
    typeof login_data !== "undefined" &&
    login_data !== null &&
    login_data !== ""
  ) {
    const access_token = login_data.userData.access_token;
    // const id = login_data.userData.data.id

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    };

    Axios.get(`${baseURL}/addresses`, config)
      .then((res) => {
        if (res.status) {
          responseData.isLoading = false;
          responseData.status = true;
          responseData.data = res.data.data;
          // showToast("success", res.data.message);
          dispatch({ type: Types.GET_ALL_ADDRESS_LIST, payload: responseData });
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.isLoading = false;
        if (typeof responseLog !== "undefined") {
          const { request, ...errorObject } = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({ type: Types.GET_ALL_ADDRESS_LIST, payload: responseData });
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};

/**
 * @returns deleteAddress
 */
export const handleDeleteAddress = (address_id) => (dispatch) => {
  let responseData = {
    isLoading: true,
    status: false,
  };

  dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });

  const login_data = JSON.parse(localStorage.getItem("loginData"));

  if (
    typeof login_data !== "undefined" &&
    login_data !== null &&
    login_data !== ""
  ) {
    const access_token = login_data.userData.access_token;

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    };

    Axios.delete(`${baseURL}/address-delete/${address_id}`, config)
      .then((res) => {
        if (res.status) {
          responseData.isLoading = false;
          responseData.status = true;
          showToast("success", res.data.message);
          dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });
          dispatch(getAllAdderss());
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.isLoading = false;
        if (typeof responseLog !== "undefined") {
          const { request, ...errorObject } = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({ type: Types.DELETE_ADDRESS, payload: responseData });
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};
