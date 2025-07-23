import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getAllusersList } from "../../services/projectService";

function AdminManageUsers() {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const { token } = useAuth();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllusersList(token);
        setUserList(res);
        setFilteredUsers(res);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchAllUsers();
  }, [token]);

  useEffect(() => {
    let result = [...userList];

    // Search
    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Sort by name
    result.sort((a, b) => {
      if (!a.name || !b.name) return 0;
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setFilteredUsers(result);
  }, [searchQuery, roleFilter, sortOrder, userList]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>

      {/* Search, Filter, Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="superadmin">Admin</option>
          <option value="company">Company</option>
          <option value="investor">Investor</option>
        </select>

        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
        >
          Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-300 text-gray-800">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="text-center hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border capitalize">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageUsers;
