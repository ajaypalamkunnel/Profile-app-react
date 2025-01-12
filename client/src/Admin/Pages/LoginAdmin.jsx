import React, { useState } from "react";
import HeaderAdmin from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminDataStart,
  fetchAdminDataFailure,
  fetchAdminDataSuccess,
} from "../../redux/user/adminSlice";
const LoginAdmin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const { username, password } = formData;
    if (!username || !password) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("invalid");

      return;
    }
    dispatch(fetchAdminDataStart());

    try {
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(fetchAdminDataSuccess(data));
      navigate("/home-admin");
    } catch (error) {
      console.error("Error during admin login:", error);

      dispatch(fetchAdminDataFailure(error.message || "Login failed"));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  return (
    <div className="bg-black h-screen">
      <HeaderAdmin />

      <div className="p-3 mt-8 max-w-lg mx-auto">
        <h1 className="text-3xl text-center text-white font-semibold my-7">
          Admin Panel Sign In
        </h1>
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
          <button className="bg-slate-700 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up"
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginAdmin;
