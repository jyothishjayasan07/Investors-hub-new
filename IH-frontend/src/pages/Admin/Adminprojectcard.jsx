import { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projectService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminProjectCard = () => {
  const [projectList, setProjectList] = useState([]);
    const { token } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects(token);
        console.log(res);
        setProjectList(res);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectList?.map((project) => (
        <div
          key={project._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={`http://localhost:3000/uploads/${project.image}`}
            alt={project.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.des}</p>
           <NavLink to={`/superadmin/projects/${project._id}`} >
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm">
                Manage
              </button>
           </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectCard;
