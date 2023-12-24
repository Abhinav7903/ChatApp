import React, { useState } from 'react';
import '../styles.css'
import Add from '../image/addAvatar.png'
import {db,auth,storage} from '../firebase'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
  
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
  
      try {
        // Update profile (using await to ensure it completes)
        await updateProfile(res.user, {
          displayName,
          photoURL: downloadURL,
        });
  
        // Create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });
  
        // Create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/login");
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    
      <div className="formcontainer">
        <div className="formWrapper">
          <span className='logo'>CHAT APP</span>
          <span className='title'>Register</span>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder='Name'/>
              <input type="email" placeholder='email' />
              <input type="password" placeholder='password' autoComplete="true" />
              <input style={{display:"none"}} type="file" id='file'  />
              <label htmlFor="file">
                <img src={Add} alt="upload an avatar" />
                <span>Add an avatar</span>
              </label>
              <button  disabled={loading}>Sign up</button>

              {err && <span className='err'>Something went wrong!</span>}
          </form>
          <p className='logintext'>You do have an account?<Link to="/login">Login</Link> </p>
          
        </div>

      </div>
    
  );
}

export default Register;


// 59:46