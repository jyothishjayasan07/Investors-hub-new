const express = require("express");
const router = express.Router();
const { registerUser } = require("../Controller/registerControllers");

router.post("/register", registerUser);

module.exports = router;
