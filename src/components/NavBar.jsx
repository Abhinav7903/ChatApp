import React, { useContext } from 'react'
import '../allstyle.css'

import { auth } from '../firebase'
// import img from '../image/img.png'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext);

  const handlesignout = () => {
    console.log('signout')
    signOut(auth)
    navigate('/login')
    
  }
  return (
    <div className="navbar">
      <span className="logo">ChatApp</span>
      <div className="user">
        <img className='userimg' src={currentUser.photoURL}alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handlesignout} type="submit" className='logout'>Logout</button>

      </div>
    </div>
  )
}

export default NavBar