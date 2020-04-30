import React, { Component } from "react";
import Home from "./components/home-module/home";
import AddProduct from "./components/product-module/addProduct";
import ViewAllSellerProducts from "./components/product-module/viewAllSellerProducts";
import SellerOrders from "./components/seller-module/sellerOrders";
import SellerReports from "./components/seller-module/sellerReports";
import OrderDetailPage from "./components/seller-module/orderDetailPage";
import ProductTrackingDetails from "./components/seller-module/productTrackingDetails";
import SellerProfile from "./components/seller-module/sellerProfile";

import EditProductDetails from "./components/product-module/editProductDetails";
// import SignIn from "./components/signin-module/login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "./components/common/alert";
import SignUp from "./components/signup-module/signup";
import Login from "./components/login-module/login";
import Orders from "./components/Orders/orders";
import Profile from "./components/profile-module/profile";
import SearchProduct from "./components/common/searchProduct";
import customerCards from "./components/customer/customerCards";
import customerAddresses from "./components/customer/customerAddresses";
import Navbar from "./components/common/navbar";
import ProductView from "./components/common/productView";
import ProductDescription from "./components/product-module/productDescription";
import Cart from "./components/cart-module/cart";
import InventoryListings from "./components/admin-module/InventoryListings";
import SellerListings from "./components/admin-module/SellerListings";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Navbar} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/orders" component={Orders} />
          <Route path="/Profile" component={Profile} />
          <Route path="/search" component={SearchProduct} />
          <Route path="/customerCards" component={customerCards} />
          <Route path="/customerAddresses" component={customerAddresses} />
          <Route path="/product" component={ProductDescription} />
          <Route path="/cart" component={Cart} />
          <Route path="/sellerOrders" component={SellerOrders} />
          <Route path="/sellerReports" component={SellerReports} />
          <Route path="/sellerProfile" component={SellerProfile} />
          <Route path="/orderDetailPage/:id" component={OrderDetailPage} />
          <Route
            path="/productTrackingDetails/:id/:id"
            component={ProductTrackingDetails}
          />
          <Route
            path="/viewAllSellerProducts"
            component={ViewAllSellerProducts}
          />
          <Route
            path="/editProductDetails/:id"
            component={EditProductDetails}
          />
          <Route path="/inventory-listings" component={InventoryListings} />
          <Route path="/seller-listings" component={SellerListings} />
          <Route path="/product-view" component={ProductView} />
        </div>
      </Router>
    );
  }
}

export default Main;
