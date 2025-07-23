import React from "react";

function ViewProjectDetails({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl   h-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{project.title}</h2>
       <img
  src={`http://localhost:3000/uploads/${project.image}`}
  alt={project.title}
  className="w-full h-100 object-cover rounded-xl mb-4 shadow img-responsive" 
  />

     <div className="text-center">
            <p className="text-gray-700 mb-2">{project.des}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Funding:</strong> ${project.currentFunding} / ${project.fundingGoal}</p>
            <div className=" gap-1 mt-2 ">
              {project.tags?.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded ">{tag}</span>
              ))}
            </div>
            <div><button onClick={onClose} className="mt-5 w-20 h-10 bg-black text-white rounded-2xl shadow">cancel</button></div>
     </div>
      </div>
    </div>
  );
}

export default ViewProjectDetails;
