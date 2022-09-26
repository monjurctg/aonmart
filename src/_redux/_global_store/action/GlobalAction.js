import * as types from "../types/Types";

export const toggleFloatingCart = (status = null) => {
    if (typeof status === 'undefined' || status === null) {
        return { type: types.TOGGLE_FLOATING_CART };
    }

    return {
        type: types.TOGGLE_FLOATING_CART,
        payload: status
    };
};

export const toggleModal = (isActive = true) => (dispatch) => {
    dispatch({ type: types.TOGGLE_MODAL, payload: isActive })
    // return {
    //     type: types.TOGGLE_MODAL,
    // };
};


export const checkIsMobileDevice = (isMobile) => {
    return {
        type: types.GET_DEVICE_INFO,
        payload: isMobile
    }
}

/**
 * @param {boolean} type true or false // default calue is true
 * @returns selectStorModal
 */
export const selectStorModal = (isActive = true) => (dispatch) => {
    dispatch({ type: types.TOGGLE_STORE_MODAL, payload: isActive })
};