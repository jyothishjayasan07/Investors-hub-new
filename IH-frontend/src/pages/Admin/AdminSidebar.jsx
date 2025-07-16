import React from 'react';
import { Folder, BarChart3, User, AlertCircle } from 'lucide-react';

function AdminSidebar({ onSelect, activeTab }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { id: 'project', label: 'Projects', icon: <Folder /> },
    { id: 'users', label: 'Users', icon: <User /> },
    { id: 'reports', label: 'Reports', icon: <AlertCircle /> },
  ];

  return (
    <div className="flex flex-col h-full bg-blue-600 text-white shadow-lg">
      <div className="text-center py-6 font-bold text-2xl border-b border-blue-400">
        Admin Panel
      </div>
      <nav className="flex flex-col mt-4 space-y-2 px-4">
        {items.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-2 py-2 px-3 rounded-md transition ${
              activeTab === id ? 'bg-blue-500 font-semibold' : 'hover:bg-blue-500'
            }`}
          >
            <span className="w-5 h-5">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
