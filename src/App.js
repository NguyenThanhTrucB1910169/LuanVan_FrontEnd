import "./App.css";
import React from "react";
import Product from "./component/products/product";
import Home from "./component/home/home"
import Register from "./component/login/register"
import Cart from "./component/cart/cart";
import CreateProduct from "./component/manage/newProduct";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./component/login/login";
import upload from "./component/manage/upload";
import NavBar from "./component/home/navbar";
function App() {
  
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/products" component={Product}></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/create" component={CreateProduct}></Route>
      <Route path="/cart" component={Cart}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
    </BrowserRouter>
  )
}

export default App;
