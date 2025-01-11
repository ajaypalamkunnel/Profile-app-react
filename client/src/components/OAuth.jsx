import {getAuth, GoogleAuthProvider, signInWithPopup}  from '@firebase/auth'

import React from 'react'
import { app } from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { signInSucess } from '../redux/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick =  async ()=>{
    try {

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      const res = await fetch('/api/auth/google-auth',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL
          })
      })

      const data = await res.json()
      dispatch(signInSucess(data))
      console.log(result);
      
      
    } catch (error) {
      
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 p-3 text-white uppercase rounded-lg hover:opacity-95'>Continue with Google</button>
  )
}

export default OAuth