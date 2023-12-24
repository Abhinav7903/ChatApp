import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';

import {  setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  

  const ProtectedRoute=({children})=>{
  const {currentUser} = useContext(AuthContext);  
    setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
  })
  .catch((error) => {
    // Handle Errors here.
    console.error(error);
  });
    if(!currentUser){
      return <Navigate to="/login" />

    }

    return children;
  }

  return (
    
<>
<Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />    
        <Route path="/register" element={<Register />} />
        {/* Add more routes for other components */}
      </Routes>
    </Router>
</>    
  );
}

export default App;


// /1:13:27
