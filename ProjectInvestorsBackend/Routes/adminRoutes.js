 const express=require('express');
const router=express.Router();
const {getallProjects, getAllusers, approveProject, getApprovedProjects}=require('../Controller/adminController');
const authenticateToken = require('../Middleware/authMiddleware');
const upload = require("../Middleware/upload");

router.get('/getAllProject', authenticateToken, getallProjects);

router.get('/getAllUsers',authenticateToken,getAllusers);

router.put("/projects/approve/:id", authenticateToken,approveProject);

router.get("/approved-projects",authenticateToken, getApprovedProjects);



module.exports=router