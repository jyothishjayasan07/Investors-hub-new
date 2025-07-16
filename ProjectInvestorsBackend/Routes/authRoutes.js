const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
} = require("../Controller/registerControllers");
const jwt = require("jsonwebtoken");
const Register = require("../Model/User");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/otpsend", sendOtp);

router.post("/verifyotp", verifyOtp);

router.get("/verify-email", async (req, res) => {
  console.log("verify**");

  const { token } = req.query;

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Register.findOne({ email }); // ✅ use findOne to get a single user

<<<<<<< HEAD
    if (user) {
      user.isEmailverified = true;
      await user.save();
      res.send("Email is Verified Successfully");
    } else {
      res.status(400).send("User Not found");
=======
        if(user){
             user.isEmailverified=true;
             await user.save()
             res.send("Email is Verified Successfully")
        }
        else{
            res.status(400).send("User Not found")
        }
>>>>>>> 8fd51b064f63acf225298ac2fc5b744f447bfe43
    }
  } catch (err) {
    res.status(400).send("Invaild Error");
  }
});

module.exports = router;
