import { combineReducers } from "redux";
import AuthReducer from "../components/authentication/_redux/Reducer/AuthReducer";
import CartReducer from "../components/cart/_redux/reducer/CartReducer";
import CheckoutReducer from "../components/checkout/_redux/Reducer/CheckoutReducer";
import ClientFeedbackReducer from "../components/clientFeedback/_redux/reducer/ClientFeedbackReducer";
// import CheckoutReducer from "../components/checkout/_redux/reducer/CheckoutReducer";
import CompanyPolicyReducer from "../components/companyPolicy/_redux/Reducer/CompanyPolicyReducer";
import OrderReducer from "../components/dashboard/orderList/_redux/reducer/OrderReducer";
import UserReducer from "../components/dashboard/_redux/reducer/userReducer";
import LocationStoreReducer from "../components/Location&Store/_redux/reducer/Location&StoreReducer";
import LocationReducer from "../components/master/location/_redux/reducer/LocationReducer";
import OurProductReducer from "../components/ourProducts/_redux/Reducer/OurProductReducer";
import ProductBannerReducer from "../components/productBanner/_redux/Reducer/ProductBannerReducer";
import ProductBrandListReducer from "../components/productBrandList/_redux/Reducer/ProductBrandListReducer";
import ProductCategoryReducer from "../components/productCategories/_redux/Reducer/ProductCategoriesReducer";
import ProductSidebarReducer from "../components/productSidebar/_redux/Reducer/ProductSidebarReducer";
import RecommendProductReducer from "../components/recommendProducts/_redux/Reducer/RecommendProductReducer";
import SearchReducer from "../components/SearchInput/_redux/Reducer/SearchInputReducer";
import SpecialOfferProductReducer from "../components/specialOfferProduct/_redux/Reducer/SpecialOfferProductReducer";
import PeopleLoveReducer from "../components/whyPeopleLoveUS/_redux/reducer/PeopleLoveReducer";
import WishlistReducer from "../components/wishlist/_redux/reducer/WishlistReducer";
import UserDataReducer from "../components/_redux/getUserData/Reducer/UserDataReducer";
import GlobalReducer from "./_global_store/reducer/GlobalReducer";
// import ProductSidebarReducer from "../components/header/_redux/Reducer/ProductSidebarReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
  GlobalReducer: GlobalReducer,
  ProductSidebarReducer: ProductSidebarReducer,
  ProductBannerReducer: ProductBannerReducer,
  ProductCategoryReducer: ProductCategoryReducer,
  ProductBrandListReducer: ProductBrandListReducer,
  RecommendProductReducer: RecommendProductReducer,
  CompanyPolicyReducer: CompanyPolicyReducer,
  OurProductReducer: OurProductReducer,
  CartReducer: CartReducer,
  AuthReducer: AuthReducer,
  UserDataReducer: UserDataReducer,
  WishlistReducer: WishlistReducer,
  CheckoutReducer: CheckoutReducer,
  LocationStoreReducer: LocationStoreReducer,
  UserReducer: UserReducer,
  SpecialOfferProductReducer: SpecialOfferProductReducer,
  PeopleLoveReducer: PeopleLoveReducer,
  ClientFeedbackReducer: ClientFeedbackReducer,
  SearchReducer: SearchReducer,
  LocationReducer: LocationReducer,
  OrderReducer: OrderReducer,
});

export default rootReducer;