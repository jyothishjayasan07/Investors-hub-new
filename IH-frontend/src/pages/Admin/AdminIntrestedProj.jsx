import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllIntrestedProjects, getAllProjects, scheduleMeeting } from '../../services/projectService';
import AdminScheduleModal from './AdminScheduleModal';

const AdminIntrestedProj = () => {
  const [intrestedList, setIntrestedList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedInterested, setSelectedInterested] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllIntrestedProjects(token);
        setIntrestedList(data);
      } catch (error) {
        console.error("Error fetching interested projects:", error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleView = async (item) => {
    setSelectedInterested(item);
    setShowModal(true);
  };

  const handleScheduleMeeting = async (id, date) => {
    try {
       await scheduleMeeting(id, date, token);
      
      alert("Meeting scheduled successfully");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err || "Failed to schedule meeting");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Interested Projects</h1>
      {intrestedList.length === 0 ? (
        <p>No interested projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intrestedList.map((item) => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold">{item.projectId?.title}</h2>
              <p className="text-sm text-gray-500">{item.projectId?.companyName}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{item.projectId?.description}</p>
              <p><strong>Funding Goal:</strong> ₹{item.projectId?.fundingGoal}</p>

              <div className="mt-4 text-sm bg-gray-100 p-2 rounded">
                <p><strong>User:</strong> {item.UserId?.name}</p>
                <p><strong>Email:</strong> {item.UserId?.email}</p>
                <p><strong>Number:</strong> {item.UserId?.number}</p>
              </div>

              <button
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleView(item)}
              >
                View & Schedule
              </button>
            </div>
          ))}
        </div>
      )}

      <AdminScheduleModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        interestedData={selectedInterested}
        onSchedule={handleScheduleMeeting}
      />
    </div>
  );
};

export default AdminIntrestedProj;
