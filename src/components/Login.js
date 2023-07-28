
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";
import * as Components from '../Components';
import '../styles.css';

import axios from 'axios'

// home component for all type of user

import { logInUser } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(logInUser(user))
})

function Login({ login, session }) {
  const [signIn, toggle] = useState(true);
  const [ number, setNumber ] = useState("")
  const [otp, setOtp] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const [showOTP, setShowOTP] = useState(false)

  const [signUpOTP, setSignUpOTP] = useState(false)

  const openPage = () => {
    toggle(!signIn)
    setNumber("")
  }

  const createMember = async (e) => {
    e.preventDefault()
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/member/create-member`, { firstName, lastName, email, phone: number }, { headers: {"Content-Type":"application/json"}})
    console.log(response.data)
    if(response.data.success){
        toast(response.data.message)
        setSignUpOTP(true)
    } else {
        toast(response.data.message)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const user = {
      id:number,
      password:otp
    }
    login(user)
    // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/member/login`, {id:number,password:otp}, { headers: {"Content-Type":"application/json"}})
    // console.log(response.data)
    // toast(response.data.message)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/member/send-otp`, {phone:number}, { headers: {"Content-Type":"application/json"}})
      console.log(response.data)
      if(response.data.success){
        setShowOTP(true)
      } else {
        toast(response.data.message, { position:'top-center' })
      }
    } catch (error) {
      console.log(error)
    }
  }


   return(
        <>
      <div className="center">
       <Components.Container>
           <Components.SignUpContainer signinIn={signIn}>
               {signUpOTP ?
                <Components.Form>
                  <Components.Title>Sign in</Components.Title>
                  <div style={{ padding: '20px 10px' }}> 
                  <Components.Input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}  />
                  </div>
                  <Components.Button onClick={handleOtpSubmit}>Verify OTP</Components.Button>
                </Components.Form>
                :
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <Components.Input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)}  />
                    <div style={{ padding: '20px 10px' }}>
                    <Components.Button onClick={createMember} >Sign Up</Components.Button>
                    </div>
                </Components.Form>
              }
           </Components.SignUpContainer>

           <Components.SignInContainer signinIn={signIn}>
                <div className="logo-image">
                <img src="/images/logo.png"/>
                </div>
                {showOTP ? 
                <Components.Form>
                  <Components.Title>Sign in</Components.Title>
                  <div style={{ padding: '20px 10px' }}> 
                  <Components.Input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}  />
                  </div>
                  <Components.Button onClick={handleOtpSubmit}>Verify OTP</Components.Button>
                </Components.Form>
                :
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <div style={{ padding: '20px 10px' }}> 
                    <Components.Input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)}  />
                    </div>
                    <Components.Button onClick={handleSubmit}>Get OTP</Components.Button>
                </Components.Form>
              }
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
                             Sign Up
                         </Components.GhostButton> 
                   </Components.RightOverlayPanel>

               </Components.Overlay>
           </Components.OverlayContainer>

       </Components.Container>
       <ToastContainer />
       </div>
    </>
   )

}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);