import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Eye, Heart, MessageCircle, Filter } from 'lucide-react';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockProjects = [
    {
      id: '1',
      title: 'EcoTech Solutions',
      description: 'Revolutionary solar panel technology that increases efficiency by 40%',
      category: 'Clean Energy',
      fundingGoal: 500000,
      currentFunding: 325000,
      companyId: '1',
      companyName: 'GreenTech Innovations',
      status: 'active',
      images: ['https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg'],
      tags: ['Solar', 'Clean Energy', 'Technology'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'HealthAI Platform',
      description: 'AI-powered diagnostic platform for early disease detection',
      category: 'Healthcare',
      fundingGoal: 750000,
      currentFunding: 450000,
      companyId: '2',
      companyName: 'MedTech Innovations',
      status: 'active',
      images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'],
      tags: ['AI', 'Healthcare', 'Diagnostics'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Smart Agriculture System',
      description: 'IoT-based farming solution to optimize crop yields and reduce water usage',
      category: 'Agriculture',
      fundingGoal: 300000,
      currentFunding: 180000,
      companyId: '3',
      companyName: 'AgriTech Solutions',
      status: 'active',
      images: ['https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
      tags: ['IoT', 'Agriculture', 'Sustainability'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19',
    },
  ];

  const categories = ['all', 'Clean Energy', 'Healthcare', 'Agriculture', 'Technology', 'Fintech'];

  const filteredProjects = selectedCategory === 'all'
    ? mockProjects
    : mockProjects.filter(project => project.category === selectedCategory);

  const stats = [
    { label: 'Portfolio Value', value: '$2.4M', icon: DollarSign, color: 'green' },
    { label: 'Active Investments', value: '12', icon: TrendingUp, color: 'blue' },
    { label: 'Scheduled Meetings', value: '3', icon: Calendar, color: 'purple' },
    { label: 'Projects Watched', value: '8', icon: Eye, color: 'orange' },
  ];

  const ProjectCard = ({ project }) => {
    const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
          <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
            <span className="text-sm text-gray-500">{project.companyName}</span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Funding Progress</span>
              <span className="font-semibold">{fundingPercentage.toFixed(0)}%</span>
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
              Invest Now
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Dashboard</h1>
          <p className="text-gray-600">Discover and invest in promising projects</p>
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

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          {[
            { id: 'discover', label: 'Discover Projects' },
            { id: 'portfolio', label: 'My Portfolio' },
            { id: 'meetings', label: 'Meetings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'discover' && (
          <div>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Portfolio</h3>
            <p className="text-gray-600">Your investment portfolio will appear here once you make your first investment.</p>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Scheduled Meetings</h3>
            <p className="text-gray-600">Your scheduled meetings with companies will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
