const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required:true
  }
});

// Corrected pre-save hook
registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ✅ Fix 1

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // ✅ Fix 2
  next();
});

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
