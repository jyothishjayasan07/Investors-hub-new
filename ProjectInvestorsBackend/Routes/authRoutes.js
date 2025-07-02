const express = require("express");
const router = express.Router();
const { registerUser , loginUser, sendOtp, verifyOtp} = require("../Controller/registerControllers");

router.post("/register", registerUser);

router.post('/login',loginUser);

router.post('/otpsend',sendOtp)

router.post('/verifyotp',verifyOtp)



module.exports = router;
