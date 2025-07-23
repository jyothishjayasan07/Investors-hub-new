const express=require('express');
const router=express.Router();
const {projectRegister,projecByUser, updateProject,deleteProject}=require('../Controller/companyController');
const authenticateToken = require('../Middleware/authMiddleware');
const upload = require("../Middleware/upload");

router.post('/projectregistration', authenticateToken, upload.single("image"), projectRegister);


router.get("/projectofuser",authenticateToken,projecByUser)


router.put('/project/:id', authenticateToken, upload.single('image'), updateProject);

router.delete('/project/:id', authenticateToken, deleteProject);

module.exports=router