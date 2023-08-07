
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";
import './styles.css';

// home component for all type of user
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CompanyForm from "./components/CompanyForm";
import CompanyForm2 from "./components/CompanyForm2";
import { Header } from "./components/Header";
import CompanyLogin from "./components/CompanyLogin";
const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
  if(session.typeOfUser == "member"){
      return(
      <>
      <Navbar/>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/companyform" element={<CompanyForm/>} />
          <Route path="/companyform2" element={<CompanyForm2/>} />
        </Routes>
      <ToastContainer />
      </>
      )
  } else if(session.typeOfUser == "admin"){
    return(
      <>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Home/>} />
        </Routes>
        <ToastContainer />
      </>
    )
  } else {
    return(
      <>
      <Routes>
        <Route path="/login" element={<CompanyLogin/>} />
        <Route path="/*" element={<Login/>} />
      </Routes>
      <ToastContainer />
    </>
   )
  }
}


export default connect(
  mapStateToProps
)(App);