import React from "react";
import { useSelector } from "react-redux";
import { Link, Links } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/home">
          <h1 className="font-bold">Profile App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={currentUser.profilePicture}
                alt="Profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
          {/* <Link to="/profile">
            <li>Profile</li>
          </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
