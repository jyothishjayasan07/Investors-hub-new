const mongoose = require("mongoose");

const companyProjectSchema = new mongoose.Schema({

 image: { type: String }, 
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fundingGoal: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
    companyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Register"
 }
  
  
},{
    timestamps:true
});

const companyProjects = mongoose.model("companyprojects", companyProjectSchema);
module.exports=companyProjects;
