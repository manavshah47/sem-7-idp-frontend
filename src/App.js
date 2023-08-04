
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
const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
  if(session.typeOfUser == "member"){
      return(
      <>
      
      <Navbar/>
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
        </Routes>
        <ToastContainer />
      </>
      )
  } else {
    return(
      <>
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/companyform" element={<CompanyForm/>} />
        <Route path="/companyform2" element={<CompanyForm2/>} />
      </Routes>
      <ToastContainer />
    </>
   )
  }
}


export default connect(
  mapStateToProps
)(App);