import React from 'react';
import "./Login.css";
import { authentication } from './firebase';
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';


function Login() {
  const [state, dispatch] = useStateValue();
    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication,provider)
        .then((re)=>{dispatch({
            type: actionTypes.SET_USER,
            user: re.user,
        })})
        .catch((err)=>{
          alert(err.message)
        })
      }

      

    return (
    <div className="login">
    <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png" alt="" />
        <div className="login__text">
          <h1>Let's Chat</h1>
        </div>
        <div className="login__button">
        
       <h3>Log In By </h3>
       <IconButton class="btn"  onClick={signInWithGoogle}><GoogleIcon />Google</IconButton>
        </div>
        
    </div>
    </div>
  )
}

export default Login


