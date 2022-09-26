import BannerServices from "../../../landingBannerTop/api";
import * as Types from "../Type/Types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCompanyPolicyList = (id) => async (dispatch) => {
  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) || "";
  const store_id = storeInformation.storeID || 2;
  let res = await BannerServices.video(store_id);
  console.log(res, "response video");
  if (res.status === 200) {
    dispatch({ type: Types.GET_COMPANY_POLICY, payload: res.data.data });
  } else {
    // console.log('res', res)
    const data = [
      {
        title: "First Delivery",
        link: "https://youtu.be/XVNURAIMjG4",
        // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        // icon: "fas fa-truck"
      },
      {
        title: "Easy Payment",
        link: "https://youtu.be/LjjfSE-n-6s",
        // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        // icon: "far fa-credit-card"
      },
      {
        title: "Place Order",
        link: "https://youtu.be/gTMvqFY1Ru0",
        // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        // icon: "fas fa-shopping-basket"
      },
      {
        title: "First Delivery",
        link: "https://youtu.be/Zrsq46mXSf4",
        // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        // icon: "fas fa-truck"
      },
    ];

    dispatch({ type: Types.GET_COMPANY_POLICY, payload: data });
  }
};

// const data = [
//     {
//         title: "First Delivery",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "fas fa-truck"
//     },
//     {
//         title: "Easy Payment",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "far fa-credit-card"
//     },
//     {
//         title: "Place Order",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "fas fa-shopping-basket"
//     },
//     {
//         title: "First Delivery",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "fas fa-truck"
//     },
//     {
//         title: "Easy Payment",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "far fa-credit-card"
//     },
//     {
//         title: "Place Order",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
//         icon: "fas fa-shopping-basket"
//     },

// ]
