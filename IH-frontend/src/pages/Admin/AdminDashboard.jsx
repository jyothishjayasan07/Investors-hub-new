import React, { useState } from "react";
import { AlertCircle, BarChart3, Folder, Plus, User } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminShowcars from "./AdminShowcars";
import AdminProjectCard from "./AdminProjectCard";
import CreateAdmin from "./CreateAdmin";

function AdminDashboard() {
  const [display, setDisplay] = useState("dashboard");
  const [showAdminCreate, setShowAdminCreate] = useState(false);

  const handleOnClose = () => {
    setShowAdminCreate(false);
  };

  const projects = [
    {
      id: "1",
      title: "AI Financial Assistant",
      description: "Automates financial planning using advanced AI.",
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    },
    {
      id: "2",
      title: "Blockchain Voting System",
      description: "Secure and transparent voting on the blockchain.",
      image:
        "https://images.pexels.com/photos/11035373/pexels-photo-11035373.jpeg",
    },
    {
      id: "3",
      title: "Remote Health Monitoring",
      description: "Wearable devices to track patient health remotely.",
      image:
        "https://images.pexels.com/photos/8460155/pexels-photo-8460155.jpeg",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 hidden lg:block">
        <AdminSidebar onSelect={setDisplay} activeTab={display} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Overview of platform activity</p>
          </div>
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 "
              onClick={() => setShowAdminCreate(true)}
            >
              <Plus className="h-4 w-4" /> Create New admin
            </button>
          </div>
        </div>

        {/* KPI Cards - Always Visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminShowcars
            name="Total Users"
            total="1,240"
            icon={<User />}
            style="text-blue-600"
          />
          <AdminShowcars
            name="Projects"
            total="245"
            icon={<Folder />}
            style="text-green-600"
          />
          <AdminShowcars
            name="Investments"
            total="$8.5M"
            icon={<BarChart3 />}
            style="text-indigo-600"
          />
          <AdminShowcars
            name="Reports"
            total="24"
            icon={<AlertCircle />}
            style="text-red-600"
          />
        </div>

        {/* Section Based on Sidebar Selection */}
        {display === "project" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Manage Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <AdminProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {display === "users" && (
          <div className="bg-white p-6 rounded-xl text-center shadow">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              User Management
            </h3>
            <p className="text-gray-600">
              User management features coming soon.
            </p>
          </div>
        )}

        {display === "reports" && (
          <div className="bg-white p-6 rounded-xl text-center shadow">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">Reports</h3>
            <p className="text-gray-600">
              View and manage user-generated reports here.
            </p>
          </div>
        )}
      </div>
      {showAdminCreate && <CreateAdmin onClose={()=>handleOnClose()}/> }
    </div>
  );
}

export default AdminDashboard;
