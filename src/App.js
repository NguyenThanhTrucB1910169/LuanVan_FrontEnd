import "./App.css";
import React from "react";
import Product from "./component/products/product";
import Home from "./component/home/home";
import Register from "./component/login/register";
import Cart from "./component/cart/cart";
import OrderSteps from "./component/order/orderConfirm";
import CreateProduct from "./component/manage/newProduct";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./component/login/login";
import ProductDetail from "./component/products/productDetail";
import AuthRoute from "./component/layouts/authRoute";
import DashBoard from "./component/manage/dashboard";
import { ToastContainer } from "react-toastify";
import UpdateInfoForm from "./component/user/updateInfoForm";
import Order from "./component/order/order";
import IntroPage from "./component/pages/introPage";
import ViewOrders from "./component/order/viewOrders";
import ContactPage from "./component/pages/contactPage";
import OrderDetail from "./component/order/orderDetail";
import AllProducts from "./component/manage/allProducts";
import EditProduct from "./component/manage/editProduct";
import AllOrders from "./component/manage/allOrders";
function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/products" component={Product}></Route>
      <Route path="/product/detail" component={ProductDetail}></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/ad/create" component={CreateProduct}></Route>
      <Route path="/ad/listpd" component={AllProducts}></Route>
      <Route path="/ad/editpd" component={EditProduct}></Route>
      <Route path="/ad/orders" component={AllOrders}></Route>
      <Route path="/login" component={Login}></Route>
      <AuthRoute path="/ad/dashboard" component={DashBoard}></AuthRoute>
      <AuthRoute path="/cart" component={Cart}/>
      <Route path="/order" component={Order}></Route>
      <Route path="/vieworder" component={ViewOrders}></Route>
      <Route path="/detailorder" component={OrderDetail}></Route>
      <Route path="/updateinfo" component={UpdateInfoForm}></Route>
      <Route path="/intro" component={IntroPage}></Route>
      <Route path="/contact" component={ContactPage}></Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App;
