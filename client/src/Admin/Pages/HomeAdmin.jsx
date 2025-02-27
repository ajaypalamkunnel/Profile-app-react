import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  // Sample data to populate the table
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditinguser] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.status}`);
        }

        const data = await res.json();

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const validateForm = (data) => {
    const errors = {};

    if (!data.username || data.username.trim() === "") {
      errors.username = "Username is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = "Valid email is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleDelete = (id) => {
    toast(
      <div className="text-center">
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-center gap-4 mt-3">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            onClick={() => confirmDelete(id)}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 transition"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: true,
      }
    );

    const confirmDelete = async (id) => {
      try {
        const res = await fetch(`/api/admin/delete-user/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Failed to delete user: ${res.status}`);
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    };
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = async (id, updatedData) => {
    if (!validateForm(updatedData)) {
      toast.error("Invalid entries");
      return;
    }

    try {
      const res = await fetch(`/api/admin/update-user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update user:${res.status}`);
      }

      const updatedUser = await res.json();

      console.log(updatedData);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? updatedUser : user))
      );

      toast.success("User updated successfully");
      setEditinguser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const cancelEditing = () => {
    setEditinguser(null);
  };
  const statEditing = (user) => {
    setEditinguser(user);
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* Header */}
      <HeaderAdmin />

      {/* Admin Table */}
      <div className="mt-8 p-3">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Admin Dashboard
        </h2>
        <div className="flex gap-2 p-3 mb-3 justify-between">
          <input
            className="p-2 bg-slate-500 rounded-lg w-80 text-white"
            type="text"
            placeholder="Search by username or email"
            value={searchTerm} // Controlled input
            onChange={handleSearch} // Update search term as the user types
          />
          
          <button onClick={()=>navigate('/add-profile')} className="bg-slate-800 text-white p-2 rounded-lg">Add New Profile</button>
          
        </div>

        {loading && <p className="text-gray-600 text-center">Loading...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && (
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
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
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
                    <td className="py-2 px-4 text-gray-800">
                      {editingUser?._id === user._id ? (
                        <div>
                          <input
                            type="text"
                            defaultValue={user.username}
                            onChange={(e) =>
                              setEditinguser({
                                ...editingUser,
                                username: e.target.value,
                              })
                            }
                            className={`border p-1 rounded ${
                              validationErrors.username
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          {validationErrors.username && (
                            <p className="text-red-500 text-sm mt-1">
                              {validationErrors.username}
                            </p>
                          )}
                        </div>
                      ) : (
                        user.username
                      )}
                    </td>

                    {/* Email */}
                    <td className="py-2 px-4 text-gray-600">
                      {editingUser?._id === user._id ? (
                        <div>
                          <input
                            type="email"
                            defaultValue={user.email}
                            onChange={(e) => {
                              setEditinguser({
                                ...editingUser,
                                email: e.target.value,
                              });
                            }}
                            className={`border p-1 rounded ${
                              validationErrors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {validationErrors.email}
                            </p>
                          )}
                        </div>
                      ) : (
                        user.email
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-4 flex justify-center gap-4">
                      {/* Update Button */}
                      {editingUser?._id === user._id ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                            onClick={() => handleUpdate(user._id, editingUser)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 transition"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => statEditing(user)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                      )}

                      {/* Delete Button */}
                      {editingUser?._id === user.id ? (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeAdmin;
