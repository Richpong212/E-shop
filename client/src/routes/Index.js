import React from 'react'
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import Product from "../pages/Product";
import Success from '../pages/Success';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



const Index = () => {
   const user = useSelector(state => state.user.currentUser)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
    
  )
}

export default Index

{
      /* 
      <BrowserRouter>
         <Routes> 
             <Route path="/" element={<Home />} />
             
             {
              //is not a user
              !user && (
                <>
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                </>
              )
             }
             {
                //is a user
                user && (
                  <>
                   <Route path="/cart" element={<Cart />} />
                  </>
                )
             }
             <Route path="/product/:id" element={<Product />} />
             <Route path="/products/:category" element={<ProductList />} />
             <Route path='/success' element={<Success />} />
             <Route path="*" element={<h1>404</h1>} />
         </Routes>
    </BrowserRouter>
    */
  }