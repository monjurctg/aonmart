import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPeopleChooseUsData } from "./_redux/action/PeopleLoveAction";

const WhyPeopleLoveUS = () => {
  const dispatch = useDispatch();
  const peopleChooseData = useSelector(
    (state) => state.PeopleLoveReducer.peopleChooseData
  );

  const [loveData, setLoveData] = useState([]);

  const loveDataFun = async () => {
    let url =
      "http://system.aonmart.net/api/v1/stores/2/banners?type=why_people_love";
    let res = await axios.get(url);

    console.log(res.data.data, "new load data from monjur");
    setLoveData(res.data.data ?? []);
  };
  console.log(loveData, "loveDAta");

  useEffect(() => {
    dispatch(getPeopleChooseUsData());
    loveDataFun();
  }, []);

  return (
    <div>
      <section className="catagory-section py-md-5 py-3">
        <div className="container-fluid">
          <div className="heading_title">
            <h4 className="heading-title">
              Why People <i className="text-danger far fa-heart"></i> AonMart
            </h4>
          </div>
          <div className="why_people_choose_us_container_section">
            <div className="row">
              {loveData.map((item, index) => (
                <div className="col-md-4 custom_col_padding" key={index}>
                  <div
                    className={`people_choose_section_card shadow-sm prople_choose_border_${index}`}
                  >
                    <img src={item.image} alt="" />
                    <div className="people_choose_section_des">
                      <h3 className="people_choose_section_title">
                        {item.title}
                      </h3>
                      <p className="people_choose_section_description">
                        {item?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyPeopleLoveUS;
