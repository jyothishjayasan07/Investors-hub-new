// components/InvestorModal.jsx
import React, { useState } from "react";

const InvestorModal = ({ visible, onClose, project, onSubmit,handleDateChange,addDateField ,availableDates}) => {
  if (!visible || !project) return null;

  const fundingPercentage =
    (project.currentFunding / project.fundingGoal) * 100;

  

  const handleSubmit = () => {
    onSubmit();
    onClose();
    // setAvailableDates([""]); // Reset modal state
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <img
          src={`http://localhost:3000/uploads/${project.image}`}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {project.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2">{project.companyName}</p>

        <div className="mb-4">
          <p className="text-gray-700">{project.description}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">
            Category: <span className="font-medium">{project.category}</span>
          </p>
          <p className="text-sm text-gray-600">Tags:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-semibold">
              {fundingPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">
              ${project.currentFunding?.toLocaleString()}
            </span>
            <span className="font-semibold text-gray-900">
              ${project.fundingGoal?.toLocaleString()}
            </span>
          </div>
        </div>

        
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold">Select Your Available Dates</h2>

            {availableDates.map((date, index) => (
              <input
                key={index}
                type="datetime-local"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
            ))}

            <button
              onClick={addDateField}
              className="text-blue-600 underline text-sm"
            >
              + Add another date
            </button>

           
          </div>
          <div className="flex justify-end gap-2 pt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
             
            </div>
             <div className="flex justify-end mt-6">
                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Interested
                </button>
              </div>
        </div>
             
      </div>

  );
};

export default InvestorModal;
