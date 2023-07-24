import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {
  const [{ user }] = useStateValue();
    
    

  return (
    <div className="app">
      <h2>chat-X</h2>
      {!user?(
        <Login/>
      ):(
      <><div className="app__body">
        
            <Router>
              <Routes>
                <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]} />
                <Route path="/" element={[<Sidebar />]} />
              </Routes>
            </Router>
          </div></>
      )}

    </div>
  );
}

export default App;
