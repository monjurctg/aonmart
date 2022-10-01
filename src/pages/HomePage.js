import React from "react";
import ClientFeedback from "../components/clientFeedback/ClientFeedback";
import LandingBannerTop from "../components/landingBannerTop/LandingBannerTop";
import ProductBanner from "../components/productBanner/ProductBanner";
import ProductBrandList from "../components/productBrandList/ProductBrandList";
import ProductCategories from "../components/productCategories/ProductCategories";
import MainLayout from "../layouts/mainLayout/MainLayout";
import OurPartners from "./../components/ourPartners/OurPartners";

const HomePage = () => {
  return (
    <MainLayout>
      <LandingBannerTop />
      <ProductCategories />
      <ProductBrandList />

      <ProductBanner />
      {/* <SpecialOfferProduct />
      <WhyPeopleLoveUS /> */}
      <ClientFeedback />
      <OurPartners />
      {/* <RecommendProduct /> */}
      {/* <OurProducts /> */}
      {/* <CompanyPolicy /> */}
    </MainLayout>
  );
};

export default HomePage;
