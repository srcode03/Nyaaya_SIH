import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes.js";
import { HomePage } from "./Routes.js";
import { SignupPage } from "./Routes.js";
import { ProductsPage } from "./Routes.js";
import { ProfilePage } from "./Routes.js";
import {FAQPage } from "./Routes.js";
import {ShopCreatePage} from "./Routes.js"
import ShopLogin from '../src/components/Shop/ShopLogin.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LawyerProfilePage from './pages/LawyerProfilePage'
import Events from './pages/Events';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/products' element={<ProductsPage/>} />
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/admin/signup' element={<ShopCreatePage/>}/>
      <Route path='/admin/login' element={<ShopLogin/>}/>
      <Route path='/admin/me' element={<LawyerProfilePage/>}/>
      <Route path='/events' element={<Events/>}/>
    </Routes>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App