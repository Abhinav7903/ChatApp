import React from 'react'
import '../allstyle.css'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useEffect, useRef } from 'react'


const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)

 
  const time = new Date(message.date.seconds * 1000).toLocaleTimeString();
  const date = new Date(message.date.seconds * 1000).toLocaleDateString();
  


  const ref = useRef();

  useEffect(() => {
    // ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
return (
  <div
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}
  >
    <div className="messageInfo">
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
        alt=""
      />
      <span >{time}</span>
      <span >{date}</span><br/>
    </div>
    <div className="messageContent">
      <p>{message.text}</p>
      {message.img && <img src={message.img} alt="" />}
    </div>
  </div>
);
};

export default Message