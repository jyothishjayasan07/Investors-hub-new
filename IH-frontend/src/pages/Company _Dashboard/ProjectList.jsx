import React from "react";
import { useProjects } from "../../context/ProjectContext";
import { Edit, Trash2, Calendar } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectList = ({setShowCreate, setEditproject}) => {
  const { projects,deleteProjectById } = useProjects();

  const handleEditClick=(id)=>{
    const project=projects.find((p)=>id===p._id)
     setEditproject(project)
    setShowCreate(true)

  }


    const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      await deleteProjectById(id);
    }
  };
  if (!projects.length) {
    return <p className="text-center text-gray-600">No projects found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

        return (
          <div key={project._id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <span className={`text-sm px-2 py-1 rounded ${project.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-200"}`}>
                {project.status}
              </span>
              <div className="flex gap-2">
                <Edit onClick={()=>handleEditClick(project._id)} className="w-4 h-4 text-gray-500" />
                <Trash2    onClick={() => handleDelete(project._id)} className="w-4 h-4 text-red-500" />
              </div>
            </div>
            {/* ✅ Project Image */}
            <img
                src={`http://localhost:3000/uploads/${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-lg mb-1">{project.title}</h3>
            <p className="text-gray-600 mb-3">{project.des}</p>
            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${fundingPercentage}%` }} />
            </div>
            <div className="text-sm text-gray-700 mb-2">
              ${project.currentFunding || 0} raised of ${project.fundingGoal}
            </div>
            <div className="flex flex-wrap gap-1 text-xs text-gray-500">
              {project.tags?.map((tag, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="text-blue-600 font-medium">View</button>
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
              
          </div>
        );
      })}
    <ToastContainer   position="top-center"/>
    </div>
  );
};

export default ProjectList;
