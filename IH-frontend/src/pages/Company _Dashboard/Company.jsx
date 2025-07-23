import React, { useState } from "react";
import ProjectList from "./ProjectList";
import CreateProject from "./CreateProject";
import { Plus, TrendingUp, DollarSign, Users, Eye, Edit, Trash2, Calendar } from 'lucide-react';


const Company = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [editproject,setEditproject]=useState(null)
const stats = [
    { label: 'Total Raised', value: '$325K', icon: DollarSign, color: 'green' },
    { label: 'Active Projects', value: '1', icon: TrendingUp, color: 'blue' },
    { label: 'Interested Investors', value: '24', icon: Users, color: 'purple' },
    { label: 'Project Views', value: '1.2K', icon: Eye, color: 'orange' },
  ];
  const handleOnClose=()=>{
    setShowCreate(false)
    setEditproject(null)
  }
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-gray-600">Manage your projects and investors</p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          onClick={()=>setShowCreate(true)}
        >
          <Plus className="h-4 w-4" /> Create Project
        </button>
      </div>
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      <ProjectList setEditproject={setEditproject} setShowCreate={setShowCreate}  />
      {showCreate && <CreateProject onClose={()=>handleOnClose()}  editproject={editproject} setEditproject={setEditproject} />}
    </div>
  );
};

export default Company;
