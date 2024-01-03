import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import VideoCall from './components/video';

function App() {
  

  const ProtectedRoute=({children})=>{
  const {currentUser} = useContext(AuthContext);  
    
    if(!currentUser){
      return <Navigate to="/login" />

    }

    return children;
  }

  return (
    
<>
<Router basename="/ChatApp">
      <Routes>
        
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />    
        <Route path="/register" element={<Register />} />
        <Route path="/video-call" element={<VideoCall/>} />
        {/* Add more routes for other components */}
      </Routes>
    </Router>
</>    
  );
}

export default App;


