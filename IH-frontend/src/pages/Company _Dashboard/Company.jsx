import React, { useState } from "react";
import {
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";

const Company = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [showCreateProject, setShowCreateProject] = useState(false);

  const mockProjects = [
    {
      id: "1",
      title: "EcoTech Solutions",
      description:
        "Revolutionary solar panel technology that increases efficiency by 40%",
      category: "Clean Energy",
      fundingGoal: 500000,
      currentFunding: 325000,
      companyId: "1",
      companyName: "Your Company",
      status: "active",
      images: [
        "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg",
      ],
      tags: ["Solar", "Clean Energy", "Technology"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
  ];

  const stats = [
    { label: "Total Raised", value: "$325K", icon: DollarSign, color: "green" },
    { label: "Active Projects", value: "1", icon: TrendingUp, color: "blue" },
    { label: "Interested Investors", value: "24", icon: Users, color: "purple" },
    { label: "Project Views", value: "1.2K", icon: Eye, color: "orange" },
  ];

  const ProjectCard = ({ project }) => {
    const fundingPercentage =
      (project.currentFunding / project.fundingGoal) * 100;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Funding Progress</span>
              <span className="font-semibold">
                {fundingPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">
                ${project.currentFunding.toLocaleString()} raised
              </span>
              <span className="font-semibold text-gray-900">
                ${project.fundingGoal.toLocaleString()} goal
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              View Details
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CreateProjectForm = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      fundingGoal: "",
      tags: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Creating project:", formData);
      setShowCreateProject(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
            <button
              onClick={() => setShowCreateProject(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Clean Energy">Clean Energy</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Technology">Technology</option>
                  <option value="Fintech">Fintech</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Goal ($)
                </label>
                <input
                  type="number"
                  value={formData.fundingGoal}
                  onChange={(e) =>
                    setFormData({ ...formData, fundingGoal: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Solar, Clean Energy, Technology"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowCreateProject(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
            <p className="text-gray-600">Manage your projects and connect with investors</p>
          </div>
          <button
            onClick={() => setShowCreateProject(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Project
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          {[
            { id: "projects", label: "My Projects" },
            { id: "investors", label: "Interested Investors" },
            { id: "meetings", label: "Meetings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "projects" && (
          <div>
            {mockProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first project to start attracting investors.
                </p>
                <button
                  onClick={() => setShowCreateProject(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Your First Project
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "investors" && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Interested Investors
            </h3>
            <p className="text-gray-600">
              Investors who have shown interest in your projects will appear here.
            </p>
          </div>
        )}

        {activeTab === "meetings" && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Scheduled Meetings</h3>
            <p className="text-gray-600">
              Your scheduled meetings with investors will appear here.
            </p>
          </div>
        )}
      </div>

      {showCreateProject && <CreateProjectForm />}
    </div>
  );
};

export default Company;
