import React, { useState, useEffect } from 'react'
import "./App.css"
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import db from "./firebase";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatIcon from '@mui/icons-material/Chat';
// import MicIcon from '@mui/icons-material/Mic';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from './StateProvider';

// 
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();


  useEffect(()=>

  onSnapshot(collection(db,"rooms"),(snapshot) => 
  setRooms(
    snapshot.docs.map((doc)=>({ 
    id: doc.id,
    data:doc.data(),
    })
    ))),
   []);
  
  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <Avatar src={user?.photoURL}  />
            <p>{user?.displayName}</p>
            <div className="sidebar__headerRight">
                <IconButton><DonutLargeIcon/></IconButton>
                <IconButton><ChatIcon/></IconButton>
                <IconButton><MoreHorizIcon/></IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <SearchIcon/>
        <input placeholder='Search Or Start new chat' type="text" />

            </div>
        
          
        </div>

        <div className="sidebar__chats">
            <SidebarChat addNewChat/>
            {rooms.map((room) =>(
            <SidebarChat key={room.id}
            id={room.id}
            name={room.data.name} />
            ))}
                
        </div>

    </div>
  )
}

export default Sidebar