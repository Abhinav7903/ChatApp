import React, { useState } from 'react';
import '../allstyle.css'; // Import your CSS file for styling
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function VideoCall() {
  const { data } = useContext(ChatContext);

  const [isVideoCallVisible, setVideoCallVisible] = useState(false);

  const isUserSelected = () => {
    return !!data.user.displayName; // Using double negation to convert truthy/falsy values to true/false
  };

  const handleButtonClick = () => {
    setVideoCallVisible(!isVideoCallVisible);
  };

  return (
    
    <div className="video-call-wrapper">
      <button disabled={isUserSelected()} onClick={handleButtonClick}>
    {isUserSelected() ? 'End Video Call' : 'Start Video Call'}
    </button>

      
        <div className="video-call-container">
          <h2>Video Call</h2>
          <video width="640" height="360" controls>
            {/* Replace 'your-video-source.mp4' with your actual video source */}
            <source src="your-video-source.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="call-controls">
            <button>Toggle Camera</button>
            <button>Mute</button>
            <button>End Call</button>
          </div>
        </div>
      
    </div>

  
  );
}

export default VideoCall;
