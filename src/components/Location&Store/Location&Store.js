import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import logo from "../../assets/images/updateaonmart.png";
import {useForm} from "react-hook-form";
// import {showToast} from "./../master/Helper/Notification";
import {RHFInput} from "react-hook-form-input";
import Select from "react-select";
import {
  getStoreList,
  handleChangeSearchLocation,
  storeSearchLocationData,
} from "./_redux/action/Location&StoreAction";
import {selectStorModal} from "../../_redux/_global_store/action/GlobalAction";
import GetCurrentLocation from "../master/utlits/GetCurrentLocation";
import SmallLoading from "./../master/simpleLoading/SmallLoading";
// import SimpleButton from "../master/simpleButton/SimpleButton";
import {getDivision} from "./../master/location/_redux/acition/LocationAction";

const LocationStore = () => {
  const dispatch = useDispatch();
  const {register, errors, handleSubmit, setValue} = useForm();
  // const divisionList = useSelector(
  //   (state) => state.LocationReducer.divisionList
  // );
  const divisionAPIData = useSelector(
    (state) => state.LocationReducer.divisionAPIData
  );
  const searchStoreInput = useSelector(
    (state) => state.LocationStoreReducer.searchStoreInput
  );
  const storeList = useSelector(
    (state) => state.LocationStoreReducer.storeList
  );
  const loadingStore = useSelector(
    (state) => state.LocationStoreReducer.loadingStore
  );
  const getLocation = GetCurrentLocation();
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

  const [selectedDivisionID, setSelectedDivisionID] = useState(null);
  const [selectDivision, setSelectDivision] = useState(null);

  useEffect(() => {
    // if (typeof getLocation !== "undefined" && getLocation !== null && getLocation) {
    //     setLocation({
    //         lat: getLocation.coordinates.lat,
    //         lng: getLocation.coordinates.lng
    //     })
    // }
  }, [getLocation]);

  useEffect(() => {
    if (
      typeof selectedDivisionID !== "undefined" &&
      selectedDivisionID !== null
    ) {
      const toSelectDivision = divisionAPIData.find(
        (item) => item.id == selectedDivisionID
      );
      setSelectDivision(toSelectDivision);
    }
  }, [selectedDivisionID]);

  useEffect(() => {
    dispatch(getDivision());
    // if (location && location.lat !== "" && location.lng !== '') {
    //     dispatch(getStoreList(location, null));
    // } else {
    //     // dispatch(getStoreList(null, null));
    // }

    if (typeof selectDivision !== "undefined" && selectDivision !== null) {
      dispatch(
        getStoreList(selectDivision.lat, selectDivision.long, selectDivision.id)
      );
    }
  }, [location, selectDivision]);

  const onSubmit = (e) => {
    dispatch(storeSearchLocationData(searchStoreInput));
    dispatch(selectStorModal(false));
    e.preventDefault();
  };

  const handleSearchInputChange = (name, value) => {
    dispatch(handleChangeSearchLocation(name, value));
  };

  return (
    <React.Fragment>
      <div className="store_location_area py-3 px-3 w-100">
        <div className="text-center">
          <img
            src={logo}
            alt="brand logo"
            style={{width: "150px", height: "150px"}}
          />
        </div>
        <div className="location_area">
          <h3 className="location_area_title"> Select Store </h3>
          <form
            className="search_location_form"
            autoComplete="off"
            autoSave="off"
            // onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="location_search_input">
              <label> Location </label>
              <RHFInput
                as={<Select options={divisionList} />}
                placeholder="Select Location"
                rules={{ required: true }}
                name="locationID"
                register={register}
                // value={searchStoreInput.location}
                onChange={(option) => {
                  handleSearchInputChange("locationID", option.value);
                  handleSearchInputChange("locationName", option.label);
                  setSelectedDivisionID(option.value);
                  // dispatch(getStoreList(location, option.value))
                }}
                setValue={setValue}
              />
            </div> */}
            <div className="location_search_input">
              <label className="d-block">
                <div className="d-flex justify-content-between align-items-center">
                  {/* <span>Store</span> */}
                  <span>
                    {loadingStore === true && (
                      <SmallLoading width="20px" height="20px" />
                    )}
                  </span>
                </div>
              </label>
              <RHFInput
                as={<Select options={storeList} />}
                placeholder="Select Store"
                rules={{required: true}}
                name="storeID"
                register={register}
                // value={searchStoreInput.store}
                onChange={(option) => {
                  handleSearchInputChange("storeID", option.value);
                  handleSearchInputChange("storeName", option.label);
                }}
                setValue={setValue}
              />
            </div>
            {/* <div className="mt-2" onClick={(e) => onSubmit(e)}>
              <SimpleButton text="Ok" />
            </div> */}
            {/* <button type="submit" className="location_search_btn" onClick={(e) => onSubmit(e)}>Search</button> */}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LocationStore;
