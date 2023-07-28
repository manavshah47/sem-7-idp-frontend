
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";
import './styles.css';

import axios from 'axios'

// home component for all type of user
import Home from "./components/Home";
import Login from "./components/Login";

const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
   return(
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <ToastContainer />
    </>
   )
}


export default connect(
  mapStateToProps
)(App);