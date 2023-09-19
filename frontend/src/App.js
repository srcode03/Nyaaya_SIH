import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, Profile } from "./Routes.js";
import { HomePage } from "./Routes.js";
import { SignupPage } from "./Routes.js";
import {LawyerSignup} from './Routes.js'
import { LawyerLogin } from './Routes.js';
import { Appointment } from './Routes.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LawyerProfile from './components/Profile/LawyerProfile';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/admin/signup' element={<LawyerSignup/>} />
      <Route path='/admin/login' element={<LawyerLogin/>} />
      <Route path='/admin/me' element={<Profile/>} />
      <Route path='/admin/profile/:id' element={<LawyerProfile/>} />
      <Route path='/admin/profile/appointment/:id' element={<Appointment/>} />
      

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