const AdminProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm">
          Manage
        </button>
      </div>
    </div>
  );
};

export default AdminProjectCard;
