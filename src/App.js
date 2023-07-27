
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { connect } from "react-redux";
import * as Components from './Components';
import './styles.css';

import axios from 'axios'

// home component for all type of user
import Home from "./components/Home";

const mapStateToProps = ({ session }) => ({
  session
});

function App() {
  const [signIn, toggle] = useState(true);
  const [ number, setNumber ] = useState("")

  const [message, setMessage] = useState("")
  const [showOTP, setShowOTP] = useState(false)

  const openPage = () => {
    toggle(!signIn)
    setNumber("")
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      console.log("num: ", number)
      const response = await axios.post("http://localhost:3001/api/member/send-otp", {phone:number}, { headers: {"Content-Type":"application/json"}})
      if(response.data.success){
        setShowOTP(true)
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


   return(
      <div className="center">
       <Components.Container>
           <Components.SignUpContainer signinIn={signIn}>
               <Components.Form>
                   <Components.Title>Create Account</Components.Title>
                   <Components.Input type='text' placeholder='First Name' />
                   <Components.Input type='text' placeholder='Last Name' />
                   <Components.Input type='email' placeholder='Email' />
                   <Components.Input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)}  />
                   <div style={{ padding: '20px 10px' }}> 
                   <Components.Button>Sign Up</Components.Button>
                   </div>
               </Components.Form>
           </Components.SignUpContainer>

           <Components.SignInContainer signinIn={signIn}>
                <div className="logo-image">
                <img src="/images/logo.png"/>
                </div>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <div style={{ padding: '20px 10px' }}> 
                    <Components.Input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)}  />
                    </div>
                    {message ? <p>{message}</p> : null}
                    <Components.Button onClick={handleSubmit}>Get OTP</Components.Button>

                    
                </Components.Form>
           </Components.SignInContainer>

           <Components.OverlayContainer signinIn={signIn}>
               <Components.Overlay signinIn={signIn}>

               <Components.LeftOverlayPanel signinIn={signIn}>
                   <Components.Title>Welcome Back!</Components.Title>
                   <Components.Paragraph>
                       To keep connected with us please login with your personal info
                   </Components.Paragraph>
                   <Components.GhostButton onClick={openPage}>
                       Sign In
                   </Components.GhostButton>
                   </Components.LeftOverlayPanel>

                   <Components.RightOverlayPanel signinIn={signIn}>
                     <Components.Title>Hello!</Components.Title>
                     <Components.Paragraph>
                         Enter Your personal details and start journey with us
                     </Components.Paragraph>
                         <Components.GhostButton onClick={openPage}>
                             Sigin Up
                         </Components.GhostButton> 
                   </Components.RightOverlayPanel>

               </Components.Overlay>
           </Components.OverlayContainer>

       </Components.Container>
       </div>
   )

}


export default connect(
  mapStateToProps
)(App);