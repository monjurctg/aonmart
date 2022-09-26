import Axios from "axios";
import { showToast } from "../../../master/Helper/ToastHelper";
import * as Types from "../Types/Types";

/**
 * Get website information
 * 
 * @since 1.0.0
 *  
 * @return website information
 */
export const getWebsiteInformation = () => async (dispatch) => {
  const responseData = {
    websiteInfo: null,
    status: false,
    isLoading: true,
  }

  dispatch({ type: Types.GET_WEBSITE_INFO, payload: responseData });

  await Axios.get('website/info')  // @todo Need to change the URL soon
    .then((res) => {
      responseData.websiteInfo = res.data.data;
      responseData.status = true;
      responseData.isLoading = false;
      dispatch({ type: Types.GET_WEBSITE_INFO, payload: responseData });
    }).catch((error) => {
      const responseLog = error.response;
      responseData.isLoading = false;

      if (typeof responseLog !== 'undefined') {
        showToast('error', responseLog.data.message);
        dispatch({ type: Types.GET_WEBSITE_INFO, payload: responseData });

      }
    })
}

/**
 * Get website page data
 * 
 * @since 1.0.0
 *  
 * @return website page data
 */
 export const getWebsitePageAction = (slug) => async (dispatch) => {
  const responseData = {
    data   : null,
    loading: true,
  }

  dispatch({ type: Types.GET_WEBSITE_PAGE, payload: responseData });

  await Axios.get(`website/pages/${slug}`)
    .then((res) => {
      responseData.data    = res.data.data;
      responseData.loading = false;
      dispatch({ type: Types.GET_WEBSITE_PAGE, payload: responseData });
    }).catch((error) => {
      const responseLog    = error.response;
      responseData.loading = false;

      if (typeof responseLog !== 'undefined') {
        showToast('error', responseLog.data.message);
        dispatch({ type: Types.GET_WEBSITE_PAGE, payload: responseData });
      }
    })
}