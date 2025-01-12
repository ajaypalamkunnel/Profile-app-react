import React, { useState } from 'react'
import HeaderAdmin from '../components/Header'
import { toast, ToastContainer } from 'react-toastify'

const LoginAdmin = () => {

    const [loading,setLoading]  = useState(false)
    const [formData,setFormData] = useState({})

    const validateForm = ()=>{
        const {username,password} = formData
        if(!username || !password){
            toast.error("All fields are required")
            return false
        }
    }

    const handleSubmit=()=>{
        e.preventDefault();

        if(!validateForm()){
            
        }
    }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
  return (
    <div className='bg-black h-screen'>
    <HeaderAdmin/>

    <div className="p-3 mt-8 max-w-lg mx-auto">
      <h1 className="text-3xl text-center text-white font-semibold my-7">Admin Panel Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button  disabled={loading} className="bg-slate-700 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign Up"}
        </button>

        
      </form>
      <ToastContainer />
    </div>


    
    </div>
  )
}

export default LoginAdmin