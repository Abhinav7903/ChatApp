import React from 'react'
import Cam from '../image/cam.png'
import Add from '../image/add.png'
import More from '../image/more.png'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import '../allstyle.css'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  const {data}=useContext(ChatContext)
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcon">
        
          <img src={Cam} alt="Start Video Call" />
            
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