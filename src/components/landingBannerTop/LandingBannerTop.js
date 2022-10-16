import React, {useEffect, useReducer} from "react";
// import topBanner from "../../assets/images/static_img/landingBannerTop.jpg";
import banner1 from "../../assets/images/static_img/_mpimage (1).webp";
import banner2 from "../../assets/images/static_img/_mpimage.webp";
import BannerServices from "./api";

const LandingBannerTop = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      bannerTop: null,
      sub_banner_one: banner1,
      sub_banner_two: banner2,
      size: "cover",
    }
  );

  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) || "";
  const store_id = storeInformation.storeID || "";
  let bannerFunc = async () => {
    let res = await BannerServices.list(store_id);
    // console.log('res', res)
    if (res.status === 200) {
      // console.log('res', res.data.data[0].image)
      // let backGroup = document.getElementById("top")
      // console.log('backGroup', backGroup)
      // backGroup.backgroundImage = "cover"
      // backGroup.backgroundSize = "cover"
      setState({
        bannerTop: res?.data?.data[0]?.image,
        sub_banner_one: res?.data?.data[1]?.image,
        sub_banner_two: res?.data?.data[2]?.image,
        size: "cover",
      });
    }
    // else if(res.status === 404){

    //   }
  };

  useEffect(() => {
    bannerFunc();
  }, [store_id]);

  let value = "";
  if (state.bannerTop) {
    value = (
      <>
        <div
          className="landing_top_banner"
          id="top"
          style={{
            backgroundImage: `url(${state.bannerTop})`,
            backgroundSize: `${state.size}`,
            backgroundPosition: "center",
          }}>
          <h3 className="landing_top_banner_title text-white">
            A Trusted Source For All Your Family Needs
          </h3>
        </div>

        <div className="container-fluid">
          <div className="row landing_top_inner_banner">
            <div className="col-lg-6 landing_top_inner_banner_img">
              <img
                src={state.sub_banner_one}
                alt="Landing top banner"
                style={{objectFit: "fill", height: "300px"}}
              />
            </div>
            <div className="col-lg-6 landing_top_inner_banner_img">
              <img
                src={state.sub_banner_two}
                alt="Landing top banner"
                style={{objectFit: "fill", height: "300px"}}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  // console.log('state.bannerTop', bannerTop)
  return <React.Fragment>{value}</React.Fragment>;
};

export default LandingBannerTop;
