import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Profile App Admin</h1>
        </Link>
        <ul className="flex gap-4">
          <Link>
          <li className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition">SignOut</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default HeaderAdmin;
