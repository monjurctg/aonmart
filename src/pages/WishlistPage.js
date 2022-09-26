import React from "react";
import Wishlist from "../components/wishlist/Wishlist";
import DashboardLayout from "./../layouts/dashboardLayout/DashboardLayout";

const WishlistPage = () => {
  return (
    <DashboardLayout>
      <Wishlist />
    </DashboardLayout>
  );
};

export default WishlistPage;
