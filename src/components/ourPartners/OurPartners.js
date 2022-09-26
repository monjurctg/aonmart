import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getCompanyPolicyList } from "../companyPolicy/_redux/Action/CompanyPolicyAction";

const OurPartners = () => {
  const dispatch = useDispatch();
  const companyPolicyList = useSelector(
    (state) => state.CompanyPolicyReducer.companyPolicyList
  );

  // const data = [1, 2, 3, 4, 5];
  // console.log("companyPolicyList", companyPolicyList);
  useEffect(() => {
    dispatch(getCompanyPolicyList());
  }, []);

  const settings = {
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // // centerPadding: "60px",
    // slidesToShow: 3,
    // speed: 500,
    autoplay: true,
    // autoplaySpeed: 2000,
    // initialSlide: 0,

    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    // infinite: true,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <section className="our_partner_section py-md-5 py-3">
        <div className="our_partner_inner_text">
          {/* <i className="fas fa-briefcase"></i> */}
          <svg
            width="80px"
            height="80px"
            version="1.1"
            viewBox="0 0 100 100"
            data-reactid=".15328ax348s.6.2.0.0.9.0.0.0.0"
          >
            <g data-reactid=".15328ax348s.6.2.0.0.9.0.0.0.0.0">
              <path
                d="m82.652 27.863h-18.59v-2.1328c0-3.4453-2.8047-6.25-6.25-6.25h-15.625c-3.4453 0-6.25 2.8047-6.25 6.25v2.1328h-18.59c-1.0039 0-1.8164 0.8125-1.8164 1.8164v16.371c0 0.78125 0.5 1.4766 1.2422 1.7227l23.281 7.75v6.6875c0 1.0039 0.8125 1.8125 1.8125 1.8164l16.289 0.035156h0.003906c0.48047 0 0.94141-0.19141 1.2812-0.53125s0.53125-0.80469 0.53125-1.2852v-6.7227l23.246-7.75c0.74219-0.24609 1.2422-0.94141 1.2422-1.7227l0.007812-16.371c0-1.0039-0.8125-1.8164-1.8164-1.8164zm-43.082-2.1328c0-1.4414 1.1719-2.6172 2.6172-2.6172h15.625c1.4414 0 2.6172 1.1719 2.6172 2.6172v2.1328h-20.859zm4.1172 34.668v-4.3672h12.656v4.3945zm37.148-15.656l-22.969 7.6562h-15.703l-23-7.6602v-13.242h61.672z"
                data-reactid=".15328ax348s.6.2.0.0.9.0.0.0.0.0.0"
              ></path>
              <path
                d="m82.652 52.398c-1.0039 0-1.8164 0.8125-1.8164 1.8164v16.184c0 3.5781-2.9102 6.4922-6.4922 6.4922l-48.691-0.003906c-3.5781 0-6.4922-2.9102-6.4922-6.4922l0.003906-16.18c0-1.0039-0.8125-1.8164-1.8164-1.8164s-1.8164 0.8125-1.8164 1.8164v16.184c0 5.582 4.543 10.125 10.125 10.125h48.691c5.582 0 10.125-4.543 10.125-10.125l-0.003906-16.184c0-1.0039-0.8125-1.8164-1.8164-1.8164z"
                data-reactid=".15328ax348s.6.2.0.0.9.0.0.0.0.0.1"
              ></path>
            </g>
          </svg>
          <h3 className="our_partner_inner_title"> Do you own a business? </h3>
          <h4 className="our_partner_sub_title">Become a Corporate Customer</h4>
        </div>

        <div>
          <Slider {...settings}>
            {typeof companyPolicyList !== "undefined" &&
              companyPolicyList.length > 0 &&
              companyPolicyList.map((item, index) => (
                // console.log('item', item)
                <div className="m-2" key={index + 1}>
                  <div className="our_partner_card ">
                    <div className="">
                      <ReactPlayer url={item.link} controls light width="100%" height={"300px"}> 
                        {/* <p className="our_partner_thumb">
          <i className={item.icon}></i>
        </p> */}
                        <div className="company_policy_details">
                          <h4 className="company_policy_title">{item.title}</h4>
                          {/* <p className="company_policy_description">
                                    {item.description}
                                  </p> */}
                        </div>
                      </ReactPlayer>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          ;
        </div>
      </section>
    </React.Fragment>
  );
};

export default OurPartners;
