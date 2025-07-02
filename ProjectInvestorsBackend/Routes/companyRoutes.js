const express=require('express');
const router=express.Router();
const {projectRegister,projecByUser}=require('../Controller/companyController');
const authenticateToken = require('../Middleware/authMiddleware');


router.post('/projectregistration',authenticateToken,projectRegister)

router.get("/projectofuser",authenticateToken,projecByUser)

module.exports=router