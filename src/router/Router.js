import React from "react";
import SubCategoryPage from "../pages/SubCategoryPage";
import CategoryWiseProductPage from "../pages/CategoryWiseProductPage";
// import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import SubSubCategoryPage from "../pages/SubSubCategoryPage";
import SignInPage from "../pages/SignInPage";
import PasswordResetPublic from "../pages/PasswordResetPublic";
import SubSubCategoryProductPage from "../pages/SubSubCategoryProductPage";
// import SubCategory from "../pages/SubSubCategory";

const routes = [
  {
    path: "/",
    name: "Home page",
    component: HomePage,
    exact: true,
  },
  {
    path: "/register",
    name: "Registration page",
    component: RegistrationPage,
    exact: true,
  },
  // {
  //   path: "/sub-category/:id",
  //   name: "Category page",
  //   component: SubCategoryPage,
  //   exact: true,
  // },
  {
    path: "/sub-sub-category/:id",
    name: "Category page",
    component: SubSubCategoryPage,
    exact: true,
  },
  {
    path: "/sub-sub-category-product/:id",
    name: "Category page",
    component: SubSubCategoryProductPage,
    exact: true,
  },
  {
    path: "/login",
    name: "SignIN page",
    component: SignInPage,
    exact: true,
  },

  {
    path: "/reset-password",
    name: "PasswordReset",
    component: PasswordResetPublic,
    exact: true,
  },
];

export default routes;
