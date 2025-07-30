import React from "react";

const AdminScheduleModal = ({ visible, onClose, interestedData, onSchedule }) => {
  if (!visible || !interestedData) return null;

  const { projectId: project, UserId: user, availableDates = [] } = interestedData;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Project Info */}
        <div className="mb-4">
          <img
            src={`http://localhost:3000/uploads/${project?.image}`}
            alt={project?.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{project?.title}</h2>
          <p className="text-gray-600 mb-2">{project?.companyName}</p>
          <p className="text-gray-700">{project?.description}</p>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Interested User</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* Available Dates */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Dates</h3>
          {availableDates.length > 0 ? (
            <ul className="space-y-2">
              {availableDates.map((date, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border p-2 rounded-lg"
                >
                  <span>{new Date(date).toLocaleString()}</span>
                  <button
                    onClick={() => onSchedule(interestedData._id, date)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Schedule Meeting
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No dates submitted by user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminScheduleModal;
