const registerSchema = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const sendEmailverification = require('../Utils/EmailTOken');




// otp
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)



//geneate otp
const generateOTP = () => (Math.floor(1000 + Math.random() * 9000)).toString()

const sendOtp = async (req, res) => {
  const { number } = req.body
  if (!number) return res.status(401).json({ message: "phone numbers is required" })

 //generate otp
  const otp = generateOTP()
  otpExpire= Date.now() + 5 * 60 * 1000


  try {
    let user=await registerSchema.findOne({number})// find one user with number
    user.otp=otp
    user.otpExpire=otpExpire
    await user.save()// update user with otp, expiry
    console.log(process.env.TWILIO_MOBILE)

    //send otptonumber
  await client.messages.create({
    body: `your otp is :${otp}`,
    from: process.env.TWILIO_MOBILE,
    to: number
  })

  res.status(200).json({ messgae: "otp send successfully" })
  } catch (error) {
    res.status(400).json({ message: "failed send otp", error: error })
  }
}


const verifyOtp = async (req, res) => {
  const { number, otp } = req.body;
  const user= await registerSchema.findOne({number})
  
  if (!user) return res.status(401).json({ message: "user not found" })


  
  if (Date.now() > user.otpExpire) {
    user.otp=null
    user.otpExpire=null
     await user.save()
    return res.status(400).json({ message: "otp Expire" })
  }
  if (user.otp == otp) {
    user.isVerified=true
    user.otp=null
    user.otpExpire=null
    await user.save()
    return res.status(200).json({ message: "verification successfully" })
  }
  res.status(400).json({ message: "invalid otp" })
}







const registerUser = async (req, res) => {

  const newUSer = new registerSchema(req.body);

  const user = await newUSer.save();
  // token 
  const token = jwt.sign(
    {
      userId: newUSer._id,
      role: newUSer.role,
      email:newUSer.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )
  await sendEmailverification(newUSer.email,token)
  const verificationurl=`http://localhost:3000/verify-email?token=${token}`
  res.status(200).json({ message: "Registered successfully", token , verificationurl})


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
   
    if(!user.isVerified) return res.status(403).json({message:"phone number not verified"})
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    // Login successful
    return res.status(200).json({ message: 'Login successful', token }); // ✅ only response sent

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Login failed', error: error.message }); // ✅ return ensures single response
  }
};

module.exports = { registerUser, loginUser, sendOtp, verifyOtp };