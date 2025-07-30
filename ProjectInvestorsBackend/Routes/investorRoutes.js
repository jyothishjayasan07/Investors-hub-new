const express=require('express');
const router=express.Router();


const { IntrestedProjects ,scheduleMeeting} = require('../Controller/investorController');

const authenticateToken = require('../Middleware/authMiddleware');

router.post('/intrested', authenticateToken, IntrestedProjects);

router.put('/intrested/:id/schedule', authenticateToken, scheduleMeeting);



module.exports=router;