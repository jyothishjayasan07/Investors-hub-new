const registerSchema=require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const registerUser=async (req,res)=>{

        const newUSer=new registerSchema(req.body);
        const user=await newUSer.save();
        // token 
        const token =jwt.sign(
            {userId:newUSer._id,
                role:newUSer.role
            },
            process.env.JWTsecret,
            {expiresIn: '2h' }
        )
        res.status(200).json({message:"Registered successfully",token})
      
    
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await registerSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' }); // ✅ return prevents further code from running
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is Incorrect' }); // ✅ return prevents duplicate response
    }

         const token =jwt.sign(
            {userId:user._id,
                role:user.role
            },
            process.env.JWTsecret,
            {expiresIn: '2h' }
        )

    // Login successful
    return res.status(200).json({ message: 'Login successful',token }); // ✅ only response sent

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Login failed', error: error.message }); // ✅ return ensures single response
  }
};

module.exports={registerUser,loginUser};