import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ClientFeedback from "../components/clientFeedback/ClientFeedback";
import CompanyPolicy from "../components/companyPolicy/CompanyPolicy";
import LandingBannerTop from "../components/landingBannerTop/LandingBannerTop";
import GetCurrentLocation from "../components/master/utlits/GetCurrentLocation";
import OurProducts from "../components/ourProducts/OurProducts";
import { getOwnProductList } from "../components/ourProducts/_redux/Action/OurProductAction";
import ProductBanner from "../components/productBanner/ProductBanner";
import ProductBrandList from "../components/productBrandList/ProductBrandList";
import ProductCategories from "../components/productCategories/ProductCategories";
import RecommendProduct from "../components/recommendProducts/RecommendProducts";
import SpecialOfferProduct from "../components/specialOfferProduct/SpecialOfferProduct";
import WhyPeopleLoveUS from "../components/whyPeopleLoveUS/WhyPeopleLoveUS";
import MainLayout from "../layouts/mainLayout/MainLayout";
import OurPartners from "./../components/ourPartners/OurPartners";

const HomePage = () => {
  return (
    <MainLayout>
      <LandingBannerTop />
      <ProductCategories />
      <ProductBrandList />

      <ProductBanner />
      <SpecialOfferProduct />
      <WhyPeopleLoveUS />
      <ClientFeedback />
      <OurPartners />
      {/* <RecommendProduct /> */}
      {/* <OurProducts /> */}
      {/* <CompanyPolicy /> */}
    </MainLayout>
  );
};

export default HomePage;
