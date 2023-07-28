
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";
import './styles.css';

// home component for all type of user
import Home from "./components/Home";
import Login from "./components/Login";

const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
  if(session.typeOfUser == "member"){
      return(
      <>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <ToastContainer />
      </>
      )
  } else {
    return(
      <>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <ToastContainer />
    </>
   )
  }
}


export default connect(
  mapStateToProps
)(App);