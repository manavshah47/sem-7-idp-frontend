import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";
import * as Components from '../Components';
import '../styles.css';

import axios from 'axios'

// home component for all type of user

import { logInUser } from "../actions/session";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(logInUser(user))
})

let initialSubmit = false

function Login({ login, session }) {
  const [signIn, toggle] = useState(true);
  const [ number, setNumber ] = useState("")
  const [otp, setOtp] = useState("")
  const [phone, setPhone] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [emailExists, setEmailExists] = useState(false);
  const [numberExists, setNumberExists] = useState(false);
  const [showOTP, setShowOTP] = useState(false)


  const [signUpOTP, setSignUpOTP] = useState(false)

  const [loader, setLoader] = useState(false)

  const openPage = () => {
    toggle(!signIn)
    setNumber("")
  }

  const [errors, setErrors] = useState({});


  const checkEmailAvailability = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/check-email/${email}`);
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const checkNumberAvailability = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/check-phone/${number}`);
      setNumberExists(response.data.exists);
    } catch (error) {
      console.error('Error checking phone:', error);
    }
  };

  const verifyOtpAndCreateMember = async (e) => {
    e.preventDefault()
    setLoader(true)

    validateEmail()
    validateFirstName()
    validateLastName()
    validateNumber()

    const isValid = Object.keys(errors).length === 0;
    if(isValid && number != ""){
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/member/create-member`, { firstName, lastName, email, phone: number, otp }, { headers: {"Content-Type":"application/json"}})
      if(response.data.success){
        toast(response.data.message)
        toggle(!signIn)
        setSignUpOTP(false)
      } else {
        toast(response.data.message)
      }
    } else {
      toast("Enter Valid Data")
    }
    setLoader(false)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    const user = {
      id:phone,
      password:otp
    }
    await login(user)
    setLoader(false)
  }

  useEffect(() => {
    checkNumberAvailability()
  }, [number])

  useEffect(() => {
    checkEmailAvailability()
  }, [email])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/send-otp`, {phone}, { headers: {"Content-Type":"application/json"}})
      if(response.data.success){
        setShowOTP(true)
        toast(response.data.message)
      } else {
        toast(response.data.message, { position:'top-center' })
      }
    } catch (error) {
      toast(error.message)
    }
    setLoader(false)
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      if(emailExists || numberExists) {
        toast("Enter unique emailId & phone number")
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/member/send-email`, { email, firstName, lastName }, { headers: {"Content-Type":"application/json"}})
      if(response.data.success){
        setSignUpOTP(true)
        toast(response.data.message)
      } else {
        toast(response.data.message, { position:'top-center' })
      }
    } catch (error) {
      toast(error.message)
    }
    setLoader(false)
  }

  const validateFirstName = () => {
    let str = "";
    
    if (!firstName.trim()) {
      str = 'firstName is required';
    }
    else if (firstName.trim().length < 2) {
      str = 'firstName must be 2 characters long';
    }

    if(str == ''){
        setErrors(err => {
            const { firstName, ...rest } = err
            return rest;
        })
    } else {
        setErrors(err => ({
            ...err,
            firstName:str
        }))
    }
  }

  const validateLastName = () => {
    let str = "";
    
    if (!lastName.trim()) {
      str = 'lastName is required';
    }
    else if(lastName.trim().length < 3) {
      str = 'lastName must be 3 characters long';
    }

    if(str == ''){
        setErrors(err => {
            const { lastName, ...rest } = err
            return rest;
        })
    } else {
        setErrors(err => ({
            ...err,
            lastName:str
        }))
    }
  }

  const validateEmail = () => {
    let str = "";
    
    if (!email.trim()) {
      str = 'email is required';
    }
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      str = 'email must be valid';
    }

    if(str == ''){
        setErrors(err => {
            const { email, ...rest } = err
            return rest;
        })
    } else {
        setErrors(err => ({
            ...err,
            email:str
        }))
    }
  }
  
  const validateNumber = () => {
    let str = "";
    
    if (!number.trim()) {
        str = 'number is required';
    } else if (!/^\d{10}$/.test(number)) {
        str = 'number must have 10 digits';
    }

    if(str == ''){
        setErrors(err => {
            const { number, ...rest } = err
            return rest;
        })
    } else {
        setErrors(err => ({
            ...err,
            number:str
        }))
    }
  }

  useEffect(() => {
    if(initialSubmit){
        validateEmail()
    }
  }, [email])

  useEffect(() => {
    if(initialSubmit){
        validateFirstName()
    }
  }, [firstName])

  useEffect(() => {
    if(initialSubmit){
        validateLastName()
    }
  }, [lastName])

  useEffect(() => {
    if(initialSubmit){
        validateNumber()
    }
  }, [number])


  useEffect(() => {
    setTimeout(() => {
      initialSubmit = true
    }, 0);
  }, [])

  if(loader){
    return (
      <div style={{width:"100vw", height:"100vh", display:'flex', zIndex:99 ,justifyContent:'center', alignItems:'center',backgroundColor:'white',position:'fixed' }}>
      <Loader/>
      </div>
    )
  } else {
   return(
     <>
      <div className="main-container">
       <Components.Container>
           <Components.SignUpContainer signinIn={signIn}>
               {signUpOTP ?
                <Components.Form>
                <Components.Title style={{ color: '#0f3c69',marginTop: 45 }}>Verify Email</Components.Title>
                  <div style={{ padding: '20px 10px 7px 10px', marginTop : 45}}> 
                  <Components.Input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}  />
                  </div>
                  <Components.Button onClick={verifyOtpAndCreateMember}>SUBMIT</Components.Button>
                </Components.Form>
                :
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors.firstName && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.firstName}</p>}
                    <Components.Input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {errors.lastName && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.lastName}</p>}
                    <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
                    {emailExists ? <p style={{color : 'red',fontSize : 12,textAlign : 'left'}}>Member With Email Already Exist</p> : <p></p>}
                    <Components.Input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)} />
                    {errors.number && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.number}</p>}
                    {numberExists ? <p style={{color : 'red',fontSize : 12,textAlign : 'left'}}>Member With Number Already Exist</p> : <p></p>}
                    <div style={{ padding: '20px 10px' }}>
                    <Components.Button onClick={sendEmail} >Sign Up</Components.Button>
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
                <Components.Title style={{ color: '#0f3c69'}}>Sign In</Components.Title>
                  <div style={{ padding: '20px 10px'}}> 
                  <Components.Input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}  />
                  </div>
                  <Components.Button onClick={handleOtpSubmit}>Verify OTP</Components.Button>
                </Components.Form>
                :
                <Components.Form>
                <Components.Title style={{ color: '#0f3c69' }}>Sign In</Components.Title>
                    <div style={{ padding: '20px 10px' }}> 
                    <Components.Input type='text' placeholder='Mobile Number' value={phone} onChange={(e) => setPhone(e.target.value)}  />
                    {errors.phone && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.phone}</p>}
                    </div>
                    <Components.Button onClick={handleSubmit}>Get OTP</Components.Button>
                    <a href="http://localhost:3001/api/admin/login" className="font-blue text-right absolute bottom-0"><u className="font-blue"> Admin Login </u></a>
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
                         Wanna be a Member of our Association? Please Sign-Up!
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
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);