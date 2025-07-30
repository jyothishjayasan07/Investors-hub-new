import React, { useEffect, useState } from "react";
import { AlertCircle, BarChart3, Folder, Plus, User } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminShowcars from "./AdminShowcars";
import AdminProjectcard from "./AdminProjectCard";
import CreateAdmin from "./CreateAdmin";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllProjects } from "../../services/projectService";



function AdminDashboard() {
  const [display, setDisplay] = useState("dashboard");
  const [showAdminCreate, setShowAdminCreate] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  
 




  
  const { token } = useAuth(); 
  const handleOnClose = () => {
    setShowAdminCreate(false);
  };

      useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects(token); // assuming it returns an array
        setProjectCount(res.length);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, [token]); 



  return (
    <div className="flex min-h-screen bg-gray-50">
 
      <div className="w-72 hidden lg:block">
        <AdminSidebar onSelect={setDisplay} activeTab={display} />
      </div>

  
      <div className="flex-1 p-6 space-y-8">
  
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

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminShowcars
            name="Total Users"
            total="1,240"
            icon={<User />}
            style="text-blue-600"
            bgstyle='bg-white'
          />
          <AdminShowcars
            name="Projects"
            total={projectCount.toString()}
            icon={<Folder />}
            style="text-green-600"
              bgstyle='bg-white'
          />
          <AdminShowcars
            name="Investments"
            total="$8.5M"
            icon={<BarChart3 />}
            style="text-indigo-600"
              bgstyle='bg-white'
          />
          <AdminShowcars
            name="Reports"
            total="24"
            icon={<AlertCircle />}
            style="text-red-600"
              bgstyle='bg-white'
          />
        </div>


        <Outlet />



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
