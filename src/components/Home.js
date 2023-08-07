import React from 'react'

import { connect } from 'react-redux'

import { logOutUser } from '../actions/session';

const mapStateToProps = ({ session }) => ({
  session
})

// dispatch logout action
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});
const Home = ({session, logout}) => {
  console.log("home: " , session)
  return (
    <div className='main-container'>
      <p style={{color:"red"}}>phone: {session.phone}</p>
      <p style={{color:"red"}}>firstName: {(session.firstName, " " ,session.lastName)|| session.name}</p>
      <p style={{color:"red"}}>email: {session.email || session.emailId}</p>
      <p style={{color:"red"}}>typeOfUser: {session.typeOfUser}</p>
      <button onClick={logout} style={{color:'red', backgroundColor:'purple', padding:'15px 20px', margin:"20px"}} > Logout </button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
