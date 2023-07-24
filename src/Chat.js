import React, { useState, useEffect } from 'react'
import "./Chat.css"
import db from './firebase';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useStateValue } from './StateProvider';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Chat() {
    const [input, setInput] = useState("")
	const { roomId } = useParams();
    const [seed, setSeed] = useState(''); 
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();
  
    useEffect (() => {
		if (roomId) {
			const docRef = doc(db, "rooms", roomId);

		getDoc(docRef).then((snapshot) => {
			setRoomName(snapshot.data().name); 
        });

		getDocs(query(collection(docRef, "messages"),orderBy("timestamp", 'asc')))
		.then((snapshot) => {
		setMessages(snapshot.docs.map((doc) => (doc.data()
		)))

		});
		}
	}, [roomId,input]);



    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000));

    },[roomId])

	const sendMessage = async (e) => {
		e.preventDefault();
		console.log("you typed >>>", input);
		const docRef = doc(db, "rooms", roomId);
	 	await addDoc(collection(docRef, "messages"), {
			name: user.displayName,
			message: input,
			timestamp: serverTimestamp(),
		}
		);
        setInput("");
    }
  return (
    <div className="chat">
        <div className="chat__header">
            <IconButton><Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/></IconButton>

            <div className="chat__headerInfo">
                <h3> {roomName}</h3>
			    <p> Last seen: {" "}{
                    new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    
                </p>
            </div>

            <div className="chat__headerRight">
                <IconButton><VideoCallIcon/></IconButton>
                <IconButton><CallIcon/></IconButton>
            </div>
            <div className="chat__headerRight__morevert">
                <IconButton><SearchIcon /></IconButton>
                <IconButton><MoreHorizIcon /></IconButton>
                </div>   
            
        </div>

        <div className="chat__body">
            {messages.map((message) => (
            <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                {message.message}
                <span className='chat__name'>{message.name}</span>              
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                <IconButton><ExpandMoreIcon 
                /></IconButton>
            </p>
            ))}
        </div>
        <div className="chat__footer">
        <IconButton><InsertEmoticonIcon/></IconButton>
        <IconButton><AttachFileIcon/></IconButton>
        <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message..' type="text" />
            <button onClick={sendMessage} type='submit'>Send a Message</button>
        </form>
        <IconButton><MicIcon/></IconButton>
        </div>
    </div>
  )
}

export default Chat