import React, { useState } from 'react'

import * as Components from '../Components';

import { Link } from 'react-router-dom';

const CompanyLogin = () => {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {

    }

  return (
    <div className="main-container">
       <Components.Container>
           <Components.SignInContainer signinIn={true}>
                <div className="logo-image">
                <img src="/images/logo.png"/>
                </div> 
                <Components.Form>
                  <Components.Title>Sign in</Components.Title>
                  <div style={{ padding: '0px 10px 20px 10px' }}> 
                    <Components.Input type='text' placeholder='Enter ID' value={id} onChange={(e) => setId(e.target.value)}  />
                    <Components.Input type='text' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                  </div>
                    <Components.Button onClick={handleSubmit}>Login</Components.Button>
                    <Link to="/" className="font-blue text-right absolute bottom-0"><u className="font-blue"> Member Login </u></Link>
                </Components.Form>
           </Components.SignInContainer>

           <Components.OverlayContainer signinIn={true}>
               <Components.Overlay signinIn={true}>
                   <Components.RightOverlayPanel signinIn={true}>
                     <Components.Title>Hello!</Components.Title>
                     <Components.Paragraph>
                         Admin Login
                     </Components.Paragraph>
                         <Components.GhostButton>
                            <a href="http://localhost:3001/api/admin/login"> Login </a>
                         </Components.GhostButton> 
                   </Components.RightOverlayPanel>
               </Components.Overlay> 
           </Components.OverlayContainer>
       </Components.Container>
       </div>
  )
}

export default CompanyLogin
