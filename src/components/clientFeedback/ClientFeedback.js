import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPeopleChooseUsData } from "./_redux/action/ClientFeedbackAction";
import Slider from "react-slick";

const ClientFeedback = () => {
  const dispatch = useDispatch();
  const clientFeedback = useSelector(
    (state) => state.ClientFeedbackReducer.clientFeedback
  );

  useEffect(() => {
    dispatch(getPeopleChooseUsData());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <section className="catagory-section py-md-5 py-3">
        <div className="container-fluid">
          <div className="heading_title">
            <h4 className="heading-title">What Our Clients Are Saying</h4>
          </div>
          <div className="client_feedback_container container">
            <Slider {...settings}>
              {typeof clientFeedback !== "undefined" &&
                clientFeedback !== null &&
                clientFeedback.length > 0 &&
                clientFeedback.map((item, index) => (
                  <div className="client_feedback_inner" key={index +1}>
                    <div className="client_feedback_profile">
                      <img
                        src={item.profile}
                        alt={item.name}
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="client_feedback_des">
                      <h4 className="client_name">{item.name}</h4>
                      <p className="client_profile_des">{item.description}</p>
                    </div>

                    
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientFeedback;
