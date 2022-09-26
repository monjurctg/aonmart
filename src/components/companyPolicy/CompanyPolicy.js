import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getCompanyPolicyList } from './_redux/Action/CompanyPolicyAction';

const CompanyPolicy = () => {

    const storeInformation = JSON.parse(localStorage.getItem("storeInformation")) || ""
    const store_id = storeInformation.storeID || ""
    const dispatch = useDispatch();
    const companyPolicyList = useSelector((state) => state.CompanyPolicyReducer.companyPolicyList);
    console.log('store_id', store_id)

    useEffect(() => {
        dispatch(getCompanyPolicyList(store_id))
    }, [store_id])

    const settings = {
        // className: "center",
        centerMode: true,
        infinite: true,
        // centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <section className="catagory-section py-md-5 py-3">
                <div className="container p-lg-0">
                    <div className="product_categories_list_slider">
                        <Slider {...settings}>
                            {
                                typeof companyPolicyList !== "undefined" && companyPolicyList.length > 0 && companyPolicyList.map((item, index) => (
                                    <div className="m-2">
                                        <div className="company_policy_card">
                                            <div className="d-flex justifyc-content-center">
                                                <p className="company_policy_thumb"> <i className={item.icon}></i></p>
                                                <div className="company_policy_details">
                                                    <h4 className="company_policy_title">
                                                        {item.title}
                                                    </h4>
                                                    <p className="company_policy_description">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CompanyPolicy;