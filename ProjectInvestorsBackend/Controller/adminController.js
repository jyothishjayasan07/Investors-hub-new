const companyProjectSchema = require('../Model/Company');
const Intrested = require('../Model/Investor');
const Register = require('../Model/User');

const getallProjects = async (req, res) => {
  try {
    const projects = await companyProjectSchema.find(); // ✅ corrected
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllusers=async(req,res)=>{
    try {
        const userslist=await Register.find();
        res.status(200).json(userslist)
    } catch (error) {
        res.status(500).json({message:"server Error",error:error.message})
    }
}


// Controller
const approveProject = async (req, res) => {
  try {
    const project = await companyProjectSchema.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project approved", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getApprovedProjects = async (req, res) => {
  try {
    const approvedProjects = await companyProjectSchema.find({ status: "approved" });
    res.status(200).json(approvedProjects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getAllIntrestedProjects = async (req, res) => {
  try {
    const intrestedProjects = await Intrested.find().populate('projectId UserId');
    res.status(200).json(intrestedProjects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}



module.exports ={getallProjects,getAllusers,approveProject,getApprovedProjects,getAllIntrestedProjects};