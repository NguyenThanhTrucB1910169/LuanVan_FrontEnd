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
import LoginSignUp from "./component/manage/loginSignup";
import { ToastContainer } from "react-toastify";
import UpdateForm from "./component/layouts/updateForm";
import Order from "./component/order/order";
import IntroPage from "./component/pages/introPage";
import ContactPage from "./component/pages/contactPage";
function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/products" component={Product}></Route>
      <Route path="/product/detail" component={ProductDetail}></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/create" component={CreateProduct}></Route>
      {/* <Route path="/cart" component={Cart}></Route> */}
      <Route path="/login" component={Login}></Route>
      <Route path="/loginadmin" component={LoginSignUp}></Route>
      <AuthRoute path="/cart" component={Cart}/>
      <Route path="/order" component={Order}></Route>
      {/* <Route path="/order/payment" component={OrderPayment}></Route> */}
      {/* <Route path="/order/confirm" component={OrderConfirm}></Route> */}
      <Route path="/updateinfo" component={UpdateForm}></Route>
      <Route path="/intro" component={IntroPage}></Route>
      <Route path="/contact" component={ContactPage}></Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App;
