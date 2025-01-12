import React from "react";
import HeaderAdmin from "../components/Header";

const HomeAdmin = () => {
  // Sample data to populate the table
  const users = [
    {
      id: 1,
      profilePicture: "https://via.placeholder.com/50",
      username: "john_doe",
      email: "john@example.com",
    },
    {
      id: 2,
      profilePicture: "https://via.placeholder.com/50",
      username: "jane_smith",
      email: "jane@example.com",
    },
    {
      id: 3,
      profilePicture: "https://via.placeholder.com/50",
      username: "mark_twain",
      email: "mark@example.com",
    },
  ];

  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* Header */}
      <HeaderAdmin />

      {/* Admin Table */}
      <div className="mt-8 p-3">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Admin Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 text-left">Profile Picture</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-100 transition-colors"
                >
                  {/* Profile Picture */}
                  <td className="py-2 px-4">
                    <img
                      src={user.profilePicture}
                      alt={`${user.username}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>

                  {/* Username */}
                  <td className="py-2 px-4 text-gray-800">{user.username}</td>

                  {/* Email */}
                  <td className="py-2 px-4 text-gray-600">{user.email}</td>

                  {/* Actions */}
                  <td className="py-2 px-4 flex justify-center gap-4">
                    {/* Update Button */}
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                      Update
                    </button>

                    {/* Delete Button */}
                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
