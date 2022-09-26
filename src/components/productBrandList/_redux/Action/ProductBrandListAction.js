import Axios from 'axios';
import * as Types from "../Type/Types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProductBrandList = () => (dispatch) => {
    const data = [
        {
            title: "Baby Care",
            brandLogo: "https://i.ibb.co/9Ww1Nn0/01.jpg",
            brandSlug: "baby_care"
        },
        {
            title: "Home Appliances",
            brandLogo: "https://i.ibb.co/g3hQW2f/02.jpg",
            brandSlug: "home_appliances"
        },
        {
            title: "Fruits and Vegetables",
            brandLogo: "https://i.ibb.co/2nWZF0C/03.jpg",
            brandSlug: "fruits_vegetables"
        },
        {
            title: "Meat and Fish",
            brandLogo: "https://i.ibb.co/TwHsVwH/04.jpg",
            brandSlug: "meat_fish"
        },
        {
            title: "Home and Cleaning",
            brandLogo: "https://i.ibb.co/RTxmn9L/05.jpg",
            brandSlug: "home_cleaning"
        },
        {
            title: "Healthy Products",
            brandLogo: "https://api-ecom.programmingshikhi.com/public/images/brands/brand--1630153135.jpg",
            brandSlug: "healthy_product"
        },
        {
            title: "Beauty & Care",
            brandLogo: "https://api-ecom.programmingshikhi.com/public/images/brands/brand--1630152900.png",
            brandSlug: "beauty_care"
        },
        {
            title: "Medicine",
            brandLogo: "https://api-ecom.programmingshikhi.com/public/images/brands/brand--1630153093.png",
            brandSlug: "medicine"
        },
        {
            title: "Medicine",
            brandLogo: "https://api-ecom.programmingshikhi.com/public/images/brands/brand--1630153517.jpg",
            brandSlug: "medicine"
        },
        {
            title: "Medicine",
            brandLogo: "https://api-ecom.programmingshikhi.com/public/images/brands/brand--1630484423.jpg",
            brandSlug: "medicine"
        },

    ]

    dispatch({ type: Types.GET_PRODUCT_BRAND_LIST, payload: data });
}