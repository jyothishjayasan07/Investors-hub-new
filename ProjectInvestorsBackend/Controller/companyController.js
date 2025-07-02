const companyProjectSchema = require('../Model/Company');

const projectRegister = async (req, res) => {
  try {
    const newProject = new companyProjectSchema({...req.body,

         companyId:req.user.userId}
        );
     
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

const projecByUser=async (req,res)=>{
    try {
        const projects=await companyProjectSchema.find({companyId:req.user.userId})
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}
module.exports = {projectRegister,projecByUser};
