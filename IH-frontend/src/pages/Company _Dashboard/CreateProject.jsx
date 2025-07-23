import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

function CreateProjectForm({ onClose,editproject ,setEditproject}) {
    const { addProject ,updateProject} = useProjects();

    const [formData, setFormData] = useState({
        title: "",
        des: "",
        category: "",
        tags: "",
        fundingGoal: "",
        image: null,
    });

    useEffect(() => {
  if (editproject) {
    setFormData({
      title: editproject.title || "",
      des: editproject.des || "",
      category: editproject.category || "",
      tags: Array.isArray(editproject.tags) ? editproject.tags.join(",") : editproject.tags || "",
      fundingGoal: editproject.fundingGoal || "",
      image: null, // Don't preload image file, just allow changing it
    });
  }
}, [editproject]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("des", formData.des);
  data.append("category", formData.category);
  data.append("tags", formData.tags);
  data.append("fundingGoal", formData.fundingGoal);
  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    if (editproject) {
      await updateProject(editproject._id, data); 
      setEditproject(null)
    } else {
      await addProject(data);
    }
    onClose();
  } catch (err) {
    console.error("Error submitting project:", err);
  }
};


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl relative">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="des" rows="3" value={formData.des} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2"></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Enter tags separated by commas"
                            />

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Funding Goal</label>
                            <input type="text" name="fundingGoal" value={formData.fundingGoal} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button onClick={onClose} type="button" className="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                           { editproject? 'Update Project' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectForm;
