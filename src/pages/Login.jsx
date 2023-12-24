import React from 'react';
import '../styles.css'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // bug del on production for testing purposes
    console.log(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log('login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="formcontainer">
      <div className="formWrapper">
        <span className='logo'>CHAT APP</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}> {/* Fix: Apply onSubmit to the form, not the button */}
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' autoComplete='true' />
          <button type="submit">Login</button>
        </form>
        <p className='logintext'>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
