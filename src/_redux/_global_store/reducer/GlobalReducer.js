import * as types from "../types/Types";
const initialState = {
  isModalActive: false,
  isStoreModalActive: false,
  floatingCartVisible: false,
  backdrop: false,
  isMobile: false
};

function GlobalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.TOGGLE_FLOATING_CART:

    const isModalVisible = typeof payload !== 'undefined' && typeof payload === 'boolean' ? payload : !state.floatingCartVisible;

      return {
        ...state,
        backdrop           : !state.backdrop,
        floatingCartVisible: isModalVisible,
      };

    case types.TOGGLE_MODAL:
      return {
        ...state,
        isModalActive: payload,
        floatingCartVisible: false,
      };
    case types.TOGGLE_STORE_MODAL:
      return {
        ...state,
        isStoreModalActive: payload,
        floatingCartVisible: false,
      };

    case types.GET_DEVICE_INFO:
      return {
        ...state,
        isMobile: payload
      };

    default:
      return state;
  }
}

export default GlobalReducer;