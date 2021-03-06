import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Env from "../../helpers/Env";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h1>Menu</h1>
            <ul>
              <Link to="orders">Orders</Link>
              <br />
              <Link to="login">Login</Link>
              <br />
              <Link to="search">Search Product</Link>
              <br />
              <Link to="customerCards">Your Cards</Link>
              <br />
              <Link to="customerAddresses">Your Addresses</Link>
              <br />
              <Link to="signup">signup</Link>
              <br />
              <Link to="addProduct">Add Product</Link>
              <br />
              <Link to="viewAllSellerProducts">View All Seller Products</Link>
              <br />
              <Link to="sellerOrders">Seller Orders</Link>
              <br />
              <Link to="sellerReports">Seller Reports</Link>
              <br />
              <Link to="sellerProfile">Seller Profile</Link>
              {/* <Route path="/sellerProfile" component={SellerProfile} /> */}
              <br />
              <Link to="/inventory-listings">Admin Inventory Listings</Link>
              <br />
              <Link to="/seller-listings">Admin Seller Listings</Link>
              <br />
              <Link to="/admin-orders">Admin Orders</Link>
              <br />
              <Link to="//admin-reports">Admin Reports</Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
