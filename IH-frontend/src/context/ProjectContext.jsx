import { createContext, useContext, useEffect, useState } from "react";
import { fetchProjects, createProject,updateProject1 } from "../services/projectService";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects(token);
      setProjects(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

const addProject = async (formData) => {
  formData.append("status", "active");

  // If tags are a comma-separated string in formData, split and append
  const tagsArray = (formData.get("tags") || "")
    .split(",")
    .map((t) => t.trim());
  formData.delete("tags"); // remove the old tags string
  tagsArray.forEach((tag) => formData.append("tags", tag)); // add tags array properly

  try {
    const newProject = await createProject(formData, token);
    setProjects((prev) => [...prev, newProject.data]);
    toast.success("Project created!");
  } catch (err) {
    toast.error(err.message);
  }
};
const updateProject = async (projectId, formData) => {
  try {
    const res = await updateProject1(projectId, formData, token);
    await loadProjects(); // ✅ refetch with token and setProjects
    toast.success("Project updated!");
  } catch (err) {
    toast.error(err.message);
  }
};



  useEffect(() => {
    if (token) loadProjects();
  }, [token]);

  return (
    <ProjectContext.Provider value={{ projects, addProject, loadProjects ,updateProject}}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
