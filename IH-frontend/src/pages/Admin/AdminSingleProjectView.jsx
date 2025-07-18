import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getAllProjects, handleApprove } from "../../services/projectService";
import { useAuth } from "../../context/AuthContext";


const AdminSingleProjectView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { token } = useAuth();

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getAllProjects(token);
        const found = res.find((p) => p._id === id);
        setProject(found);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [id, token]);

  // ✅ Moved approveProject outside useEffect
  const approveProject = async (projectId) => {
    try {
      await handleApprove(projectId, token); // pass both projectId and token
      alert("Project approved successfully");
    } catch (err) {
      alert("Failed to approve project");
      console.error("Approval error:", err);
    }
  };

  if (!project) {
    return <div className="text-center mt-10 text-gray-400">Loading project...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <img
        src={`http://localhost:3000/uploads/${project.image}`}
        alt={project.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h2>
      <p className="text-gray-600">{project.des}</p>
      <p className="text-gray-600">{project.category}</p>
      <p className="text-gray-600 font-bold">{project.fundingGoal}</p>
      <p className="text-gray-600">{project.tags}</p>

      <div className="flex justify-between items-center mt-6">
        <div>
          <NavLink to={"/superadmin/projects"}>
            <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-600 text-sm">
              Back
            </button>
          </NavLink>
        </div>
        <div className="flex gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500 text-sm">
            Reject
          </button>
          <button
            onClick={() => approveProject(project._id)}
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-600 text-sm"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleProjectView;
