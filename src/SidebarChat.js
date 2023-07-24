import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import db from './firebase'
import {   addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,  } from 'firebase/firestore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
//import IconButton from '@mui/material/IconButton';

function SidebarChat({id, name,addNewChat}) {
    const [seed, setSeed] = useState(''); 
    const [messages, setMessages] = useState("");
    useEffect(() => {
      if (id) {
        const q = query(
          collection(db, "rooms", id, "messages"),
          orderBy("timestamp", "asc")
        );
        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            setMessages(doc.data());
          });
        });
      }
    }, [id]);


    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000));

    },[])


    const createChat = async () => {
      const roomName = prompt("Please enter Room Name");

      if (roomName){
        const collectionRef = collection(db, "rooms");
        const payload = {name : roomName, };
        addDoc(collectionRef, payload);
        }
      };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info">

            <h2>{name}</h2>
            <p>{messages.message}</p>
            

        </div>

    </div>

    </Link>
  ):(
    <div onClick={createChat} className="sidebarChat">
        <h2>Add New Room</h2>
        
    </div>
  )
}

export default SidebarChat