import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import OAuth from "../components/OAuth";

const Sigin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  //form validation

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^[a-zA-Z0-9]{4,}$/.test(username)) {
      toast.error("Username must be alphanumeric and at least 4 characters.");
      return false;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log("====>", data);

      if (!res.ok) {
        setError(true);
        toast.error(data.message || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(false);
      toast.success("User created succesfully😎");
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign up. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
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
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an accout </p>
        <Link to="/sign-in">
          <span className="text-blue-600 ">sign In</span>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sigin;
