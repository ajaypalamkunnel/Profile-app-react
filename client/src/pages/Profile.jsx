import React, { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.username);
  const fileRef = useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [dataTostore, setDataToStore] = React.useState(null);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold  text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          className="ml-auto h-24 w-24 mr-auto cursor-pointer rounded-full object-cover mt-2"
          src={imageUrl||currentUser.profilePicture}
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
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg  p-3 "
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg  p-3 "
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-white cursor-pointer p-2 rounded-lg bg-red-600">
          Delete Account
        </span>
        <span className="text-white cursor-pointer p-2 rounded-lg bg-red-600">
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
