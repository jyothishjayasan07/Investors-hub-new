import React from "react";
const Base_url=import.meta.env.VITE_API_URL|| "https://investors-hub-new.onrender.com";
function ViewProjectDetails({ project, onClose, meetings }) {
  if (!project) return null;

  // Filter meetings specific to this project
  const projectMeetings = meetings.filter(
    (meeting) => meeting.projectId?._id === project._id
  );

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">{project.title}</h2>

        <img
          src={`Base_url/uploads/${project.image}`}
          alt={project.title}
          className="w-full h-64 object-cover rounded-xl mb-4 shadow"
        />

        <div className="text-gray-700">
          <p className="mb-2">{project.des}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Funding:</strong> ${project.currentFunding} / ${project.fundingGoal}</p>

          <div className="mt-2 mb-3 flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          {projectMeetings.length > 0 ? (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Scheduled Meetings:</h4>
              <div className="flex flex-wrap gap-2">
                {projectMeetings.map((meeting, i) => {
                  const date = new Date(meeting.scheduledDate);
                  const formattedDate = date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const formattedTime = date.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {formattedDate} at {formattedTime}
                      {meeting.UserId?.name ? ` with ${meeting.UserId.name}` : ""}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-4">No meetings scheduled.</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="w-24 h-10 bg-black text-white rounded-2xl shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProjectDetails;
