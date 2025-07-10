const nodemiler=require('nodemailer')

const transporter=nodemiler.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const sendEmailverification=async(to,token)=>{
    const verificationurl=`http://localhost:6000/verify-email?token=${token}`


    await transporter.sendMail({
        from:`Your App ${process.env.EMAIL_USER}`,
        to,
        subject:"verify your Email",
        html:`
        <h2>Verify Your Email</h2>
        <p>Clicke the link below to verify your email</p>
       <button> <a href="${verificationurl}"> Verify </a></button>
        `
    })
    
}

module.exports=sendEmailverification;