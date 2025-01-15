import React from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {clearAdminData} from '../../redux/user/adminSlice'
const HeaderAdmin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminData } = useSelector((state) => state.admin);
  

  const handleSignout = async()=>{
      try {
        await fetch("/api/admin/signout")
        dispatch(clearAdminData())
        navigate('/login-admin')
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="">
          <h1 className="font-bold">Profile App Admin</h1>
        </Link>
        <ul className="flex gap-4">
          {adminData&&(
          <Link>
          <li onClick={()=>handleSignout()} className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition">SignOut</li>
          </Link>
          )
          }
        </ul>
      </div>
    </div>
  );
};

export default HeaderAdmin;
