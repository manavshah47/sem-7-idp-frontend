
import React from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { connect } from "react-redux";

// home component for all type of user
import Home from "./components/Home";

const mapStateToProps = ({ session }) => ({
  session
});

function App({session}) {
  return (
    <>
    <div className="main-div">
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
    </>
  );
}


export default connect(
  mapStateToProps
)(App);
