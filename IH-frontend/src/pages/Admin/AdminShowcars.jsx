const AdminShowcars = ({ name, total, icon, style }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
      <div className={`text-3xl ${style}`}>{icon}</div>
      <div>
        <h4 className="text-sm text-gray-600">{name}</h4>
        <p className="text-xl font-bold text-gray-900">{total}</p>
      </div>
    </div>
  );
};

export default AdminShowcars;
