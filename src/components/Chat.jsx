import React from 'react'
import Cam from '../image/cam.png'
import Add from '../image/add.png'
import More from '../image/more.png'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import '../allstyle.css'
import Messages from './Messages'
import Input from './Input'
import { Link } from 'react-router-dom'
const Chat = () => {
  const {data}=useContext(ChatContext)
  const isUserSelected = () => {
    return !!data.user // Using double negation to convert truthy/falsy values to true/false
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcon">
        {isUserSelected && (
            <Link to="/video-call">
              <img src={Cam} alt="Start Video Call" />
            </Link>
          )}
            <img src={Add} alt="" />
            <img src={More} alt="" />

        </div>
        
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat