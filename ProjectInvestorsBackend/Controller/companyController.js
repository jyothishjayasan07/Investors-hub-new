const companyProjectSchema = require('../Model/Company');

const projectRegister = async (req, res) => {
  try {
    const { title, des, category, tags, fundingGoal } = req.body;

    const newProject = new companyProjectSchema({
      title,
      des,
      category,
      tags,
      fundingGoal,
      image: req.file ? req.file.filename : null,
      companyId: req.user.userId,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project registered successfully",
      data: savedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Project registration failed",
      error: error.message,
    });
  }
};



const updateProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const companyId = req.user.userId;

    // Check if project exists and belongs to the authenticated company
    const project = await companyProjectSchema.findOne({ _id: projectId, companyId });
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized access" });
    }

    // Extract fields from request body
    const { title, des, category, tags, fundingGoal } = req.body;

    // Update the fields if they exist in the request
    if (title) project.title = title;
    if (des) project.des = des;
    if (category) project.category = category;
    if (tags) project.tags = tags;
    if (fundingGoal) project.fundingGoal = fundingGoal;

    // If a new image was uploaded via multer
    if (req.file) {
      project.image = req.file.filename;
    }

    const updatedProject = await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Project update failed",
      error: error.message,
    });
  }
};




const projecByUser=async (req,res)=>{
    try {
        const projects=await companyProjectSchema.find({companyId:req.user.userId})
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}
module.exports = {projectRegister,projecByUser,updateProject};
