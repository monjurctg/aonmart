import BannerServices from '../../../landingBannerTop/api';
import * as Types from "../Type/Types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProductBannerList = () => async(dispatch) => {
    const storeInformation = JSON.parse(localStorage.getItem("storeInformation")) || ""
    const store_id = storeInformation.storeID || ""
    let res = await BannerServices.listSlide(store_id)
    if(res.status === 200){
        // console.log('res.data.data', res.data.data)

    dispatch({ type: Types.GET_PRODUCT_BANNER_LIST, payload: res.data.data });
    }else{

        const data = [
            {
                title    : "Organic and fresh food",
                subTitle: "Get freshness delivered",
                subtitle2: "on your doorstep.",
                image      : "https://i.ibb.co/hZVpPt1/banner-bg2.jpg"
            },
            {
                title    : "Organic and fresh food",
                subTitle: "Get freshness delivered",
                subtitle2: "on your doorstep.",
                image      : "https://i.ibb.co/7tYFvQ6/banner-bg3.jpg"
            },
            {
                title    : "Organic and fresh food",
                subTitle1: "Get freshness delivered",
                subtitle2: "on your doorstep.",
                image      : "https://i.ibb.co/8YyYKrK/banner-bg-5.jpg"
            },
        ]
    
        dispatch({ type: Types.GET_PRODUCT_BANNER_LIST, payload: data });
    }
}