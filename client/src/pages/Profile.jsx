import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserState,
  deleteUserSucces,
  signInFailure,
  signout,
  updateUserFailure,
  updateUserState,
  updateUserSucces,
} from "../redux/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser.username);
  const navigate = useNavigate()
  const fileRef = useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [dataTostore, setDataToStore] = React.useState(null);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  // data send api for image handling
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "profileapp");
      formData.append("cloud_name", "dz3xm2xwo");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dz3xm2xwo/image/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );
        setImageUrl(response.data.secure_url);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //delete handling
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserState());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.message || "Account deletion failed";
        dispatch(deleteUserFailure(data));
        toast.error(errorMessage);
        return;
      }
      dispatch(deleteUserSucces());
      toast.success("Account deleted succesfully");
    } catch (error) {
      console.error("Error while deleting Profile:", error);
      dispatch(deleteUserFailure());
      toast.error("An unexpected error occurred. Please try again.");
    }
  };


  //handle signout

    const handleSignout = async()=>{
      try {
        await fetch("/api/auth/signout")
        dispatch(signout())
        navigate('/')
      } catch (error) {
       console.log(error);
        
      }
    }


  // data send api for backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl) {
      formData["profilePicture"] = imageUrl;
    }
    if (Object.keys(formData).length === 0) {
      toast.warn("Please update details");
      return;
    }

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data.message || "Profile update failed!";
        dispatch(updateUserFailure(data));
        toast.error(errorMessage);
        return;
      }
      dispatch(updateUserSucces(data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      dispatch(updateUserFailure(error));
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold  text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          className="ml-auto h-24 w-24 mr-auto cursor-pointer rounded-full object-cover mt-2"
          src={imageUrl || currentUser.profilePicture}
          alt="Profile IMG"
          onClick={() => fileRef.current.click()}
        />
        <div className="mx-auto">
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading image... ${uploadProgress}% `}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </div>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg  p-3 "
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg  p-3 "
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg  p-3 "
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-white cursor-pointer p-2 rounded-lg bg-red-600"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-white cursor-pointer p-2 rounded-lg bg-red-600">
          Sign out
        </span>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default Profile;
