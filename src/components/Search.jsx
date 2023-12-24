import { useContext, useState } from "react"
import React from 'react'
import { collection,query,where,getDoc,getDocs, doc,setDoc, updateDoc, serverTimestamp  } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
const Search = () => {
  const [username,setUsername] = useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)
  const {currentUser}=useContext(AuthContext)
  const handleSearch = async () => {
    if (username === currentUser.displayName) {
      alert("You cannot search yourself");
      return;
    }
    try {
      const q = query(collection(db, "users"), where("displayName", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErr(true); // Set error if no user is found
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(false);
      }
    } catch (err) {
      console.error(err);
      setErr(true);
    } finally {
      setUsername("");
    }
  };

  const handleSelect = async () => {
    // check weather the group already exists or not if not create new one
    const combinedId=currentUser.uid>user.uid
    ?currentUser.uid+user.uid
    :user.uid+currentUser.uid;
    try{
    const res=await getDoc(doc(db,"chats",combinedId));
    if(!res.exists()){
      // create new chat
      await setDoc(doc(db,"chats",combinedId),{messages:[]});

      // create user chats
      await updateDoc(doc(db,"userChats",currentUser.uid),
      {
        [combinedId+".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL

        },
        [combinedId+".date"]:serverTimestamp()
      }
      );
      await updateDoc(doc(db,"userChats",user.uid),
      {
        [combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL

        },
        [combinedId+".date"]:serverTimestamp()
      }
      );
    }
    }catch(err){
      console.error(err)
    }
    setUser(null);
    setUsername("")

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };


  return (
    <div className="search">
      <div className="searchForm">
      <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}

          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search