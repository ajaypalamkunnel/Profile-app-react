import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.username);
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold  text-center my-7">Profile</h1>
      
      <form className="flex flex-col gap-4">
        <img
          className="ml-auto h-24 w-24 mr-auto cursor-pointer rounded-full object-cover mt-2"
          src={currentUser.profilePicture}
          alt="Profile IMG"
        />
        
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg  p-3 " />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg  p-3 " />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg  p-3 " />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-white cursor-pointer p-2 rounded-lg bg-red-600">Delete Account</span>
        <span className="text-white cursor-pointer p-2 rounded-lg bg-red-600">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
