import * as Types from "../type/Types";

const initialState = {
    updateProfileInput: {
        _method: "PUT",
        name: "",
        mobile: "",
        email: "",
        about: "",
    },
    userProfileUpdateInput: {
        _method: "PUT",
        image: "",
        imagePreview: "",
    },
    newAddressInput: {
        division_id: "",
        district_id: "",
        upazila_id: "",
        mobile: "",
        address: "",
        is_default: false
    },
    passwordInput: {
        _method: "PUT",
        old_password: '',
        password: '',
        password_confirmation: ''
    },
    isUpdating: false,
    isLoading: false,
    addingNewAddress: false,
    singleUserInfo: null,
    addressList: [],
    loadingAddress: false
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case Types.HANDLE_CHANGE_PROFILE_UPDATE_INPUT:
            const updateProfileInput = { ...state.updateProfileInput };
            updateProfileInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                updateProfileInput
            };
        case Types.UPDATE_USER_INFORMATION:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
            };
        case Types.GET_USER_INFORMATION:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                singleUserInfo: action.payload.data,
            };
        case Types.CHANGE_PROFILE_PHOTO_INPUT:
            const userProfileUpdateInput = { ...state.userProfileUpdateInput };
            userProfileUpdateInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                userProfileUpdateInput
            };
        case Types.HANDLE_CHANGE_PASSWORD_INPUT:
            const passwordInput = { ...state.passwordInput };
            passwordInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                passwordInput
            };
        case Types.UPDATED_PASSWORD:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isUpdating: action.payload.isUpdating,
                    passwordInput: initialState.passwordInput,
                };
            } else {
                return {
                    ...state,
                    isUpdating: action.payload.isUpdating,
                };
            }

        case Types.CHANGE_ADDRESS_INPUT:
            const newAddressInput = { ...state.newAddressInput };
            newAddressInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                newAddressInput
            };

        case Types.ADD_NEW_ADDRESS:
            if (action.payload.status === true) {
                return {
                    ...state,
                    addingNewAddress: action.payload.isLoading,
                    newAddressInput: initialState.newAddressInput,
                };
            } else {
                return {
                    ...state,
                    addingNewAddress: action.payload.isLoading,
                };
            }
        case Types.GET_ALL_ADDRESS_LIST:
            return {
                ...state,
                addressList: action.payload.data,
                loadingAddress: action.payload.isLoading,
            };

        default:
            break;
    }
    return state;
}
export default UserReducer;