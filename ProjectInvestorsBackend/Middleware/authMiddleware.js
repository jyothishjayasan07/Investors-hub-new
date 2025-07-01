const jwt=require('jsonwebtoken');

const authenticateToken=(req,res,next)=>{
    const token =req.header('Authorization')?.split(" ")[1]

    if (!token) return res.Status(400).json({message:"No token requird"})

        try {
            const decode=jwt.verify(token,process.env.JWTsecret);
            req.user=decode;
            next();
        } catch (error) {
            res.Status(401).json({message:"Invalid Token"})
        }
}
 module.exports=authenticateToken;