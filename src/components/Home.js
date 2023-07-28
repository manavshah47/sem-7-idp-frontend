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
    <div>
      <p style={{color:"red"}}>phone: {session.phone}</p>
      <p style={{color:"red"}}>firstName: {session.firstName}</p>
      <p style={{color:"red"}}>lastName: {session.lastName}</p>
      <p style={{color:"red"}}>email: {session.email}</p>
      <p style={{color:"red"}}>typeOfUser: {session.typeOfUser}</p>
      <button onClick={logout} style={{color:'red', backgroundColor:'purple', padding:'15px 20px', margin:"20px"}} > Logout </button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
