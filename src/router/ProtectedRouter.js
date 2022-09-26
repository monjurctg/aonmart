import React from "react";
import CheckoutPage from "../pages/CheckoutPage";
 
const protectedRoutes = [
  {
    path: "/checkout",
    name: "Checkout page",
    component: CheckoutPage,
    exact: true, 
  },
  
  
];

export default protectedRoutes;
