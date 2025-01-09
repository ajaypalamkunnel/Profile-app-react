import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/home'>
        <h1 className="font-bold">Profile App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li to="/sign-in">Sign In</li>
          <li to="/profile">Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
