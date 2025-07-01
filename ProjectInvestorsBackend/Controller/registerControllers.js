const registerSchema=require('../Model/User');

const registerUser=async (req,res)=>{
    try {
        const newUSer=new registerSchema(req.body);
        const user=await newUSer.save();
        res.status(200).json({message:"Registered successfully"})
        // token
    } catch (error) {
        res.status(400).json({message:"Failed",error:error.msg})
    }
}
module.exports={registerUser};