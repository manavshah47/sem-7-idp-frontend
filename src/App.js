
import React, { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";

import socketio from "socket.io-client";

import './styles.css';

import CompanyLogin from './components/CompanyLogin';
import Login from './components/Login';
import Loader from "./components/Loader";

// components import
const Profile = lazy(() => import("./components/Profile"));
const Navbar = lazy(() => import("./components/Navbar"));
const CompanyForm = lazy(() => import("./components/CompanyForm"));
const CompanyForm2 = lazy(() => import("./components/CompanyForm2"));
const CompanyForm3 = lazy(() => import("./components/CompanyForm3"));
const MembershipStatus = lazy(() => import("./components/MembershipStatus"));
const CreateUser = lazy(() => import("./components/CreateUser"));
const MembershipTable = lazy(() => import("./components/MembershipTable"));
const ChatHome = lazy(() => import("./components/ChatHome"));
const ShowUser = lazy(() => import("./components/ShowUser"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const EmployeeDashboard = lazy(() => import("./components/EmployeeDashboard"));
const Booking = lazy(() => import("./components/Booking"));

const MagazineUpload = lazy(() => import("./components/MagazineUpload"));
const Magazines = lazy(() => import("./components/Magazines"));
const Magazine = lazy(() => import("./components/Magazine"));
const MemberDashboard = lazy(() => import("./components/MemberDashboard"));
const MagazineDashboard = lazy(() => import("./components/MagazineDashboard"));
const LabTable = lazy(() => import("./components/LabTable"));


const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
 
  const getSocket = () => {
    // const token = LocalStorage.get("token"); // Retrieve jwt token from local storage or cookie
    const user = session

    // Create a socket connection with the provided URI and authentication
    return socketio("https://membership-management-backend.onrender.com/", {
      withCredentials: true,
      auth: { user },
    });
  };

  const socket = getSocket()


  if(session.typeOfUser == "member"){
      return(
      <>
      <Navbar/>
      <div className="backImage">
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/membership-form" element={<CompanyForm/>} />
          <Route path="/company-info-2" element={<CompanyForm2/>} />
          <Route path="/company-info-3" element={<CompanyForm3/>} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
          <Route path="/membership-table" element={<MembershipTable/>}/>
          <Route path="/magazine" element={<Magazine/>}/>
          <Route path="/book" element={<Booking/>}/>
          <Route path="/chat" element={<ChatHome socket={socket} />}/>
          <Route path="/*" element={<MemberDashboard />}/>
      </Routes>
      </Suspense>
      </div>
      <ToastContainer />
      </>
      )
    } else if(session.typeOfUser == "admin"){
      return(
        <>
        <Navbar/>
        <div className="backImage">
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-employee" element={<CreateUser/>} />
          <Route path="/show-users" element={<ShowUser/>} />
          <Route path="/pending-memberships" element={<MembershipTable type="pending" />} />
          <Route path="/completed-memberships" element={<MembershipTable type="completed" />} />
          <Route path="/all-memberships" element={<MembershipTable type="all" />} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
          <Route path="/lab-booking" element={<LabTable/>} />
          <Route path="/*" element={<Dashboard/>} />
        </Routes>
        </Suspense>
        </div>
        <ToastContainer />
      </>
    )
  } else if(session.typeOfUser == "magazine-manager") {
    return (
      <>
        <Navbar/>
        <div className="backImage">
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/upload-magazine" element={<MagazineUpload/>} />
          <Route path="/show-magazines" element={<Magazines/>} />
          <Route path="/magazine" element={<Magazine/>} />
          <Route path="/lab-booking" element={<LabTable/>} />
          <Route path="/*" element={<MagazineDashboard/>} />
        </Routes>
        </Suspense>
        </div>
        <ToastContainer />
      </>
    )
  } else if(session.typeOfUser == "approver"){
    return(
      <>
        <Navbar/>
        <div className="backImage">
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/pending-memberships" element={<MembershipTable type="pending" />} />
          <Route path="/completed-memberships" element={<MembershipTable type="completed" />} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
          <Route path="/*" element={<EmployeeDashboard/>} />
        </Routes>
        </Suspense>
        </div>
        <ToastContainer />
      </>
    )
  } else {
    return(
      <>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/login" element={<CompanyLogin/>} />
        <Route path="/*" element={<Login/>} />
      </Routes>
      </Suspense>
      <ToastContainer />
    </>
   )
  }
}


export default connect(
  mapStateToProps
)(App);
