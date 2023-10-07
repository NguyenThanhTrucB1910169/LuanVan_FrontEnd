import "./App.css";
import React from "react";
import Product from "./component/products/product";
import Home from "./component/home/home";
import Register from "./component/login/register";
import Cart from "./component/cart/cart";
import CreateProduct from "./component/manage/newProduct";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/login/login";
import ProductDetail from "./component/products/productDetail";
import AuthRoute from "./component/layouts/authRoute";
import DashBoard from "./component/manage/dashboard";
import { ToastContainer, Flip } from "react-toastify";
import UpdateInfoForm from "./component/user/updateInfoForm";
import Order from "./component/order/order";
import IntroPage from "./component/pages/introPage";
import ViewOrders from "./component/order/viewOrders";
import ContactPage from "./component/pages/contactPage";
import OrderDetail from "./component/order/orderDetail";
import AllProducts from "./component/manage/allProducts";
import EditProduct from "./component/manage/editProduct";
import AllOrders from "./component/manage/allOrders";
import AllUsers from "./component/manage/allUsers";
import Profile from "./component/user/profile";
import FileUploadComponent from "./component/user/upload";
import AdRoute from './component/layouts/adRoute'
function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} hideProgressBar transition={Flip} closeButton={false}/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/products/:search" component={Product}></Route>
        <Route path="/product/detail" component={ProductDetail}></Route>
        <Route path="/register" component={Register}></Route>
        <AdRoute path="/ad/create" component={CreateProduct}></AdRoute>
        <AdRoute path="/ad/listpd" component={AllProducts}></AdRoute>
        <AdRoute path="/ad/editpd" component={EditProduct}></AdRoute>
        <AdRoute path="/ad/orders" component={AllOrders}></AdRoute>
        <AdRoute path="/ad/allusers" component={AllUsers}></AdRoute>
        <Route path="/login/:tab" component={Login}></Route>
        <AuthRoute path="/ad/dashboard" component={DashBoard}></AuthRoute>
        <AuthRoute path="/cart" component={Cart} />
        <Route path="/order" component={Order}></Route>
        <Route path="/vieworder" component={ViewOrders}></Route>
        <Route path="/detailorder" component={OrderDetail}></Route>
        <Route path="/updateinfo" component={UpdateInfoForm}></Route>
        <Route path="/intro" component={IntroPage}></Route>
        <Route path="/contact" component={ContactPage}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/upload" component={FileUploadComponent}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
