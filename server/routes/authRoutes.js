const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");
const upload = require("../config/multerConfig");


router.post("/apply", upload.single("cv"), register);

module.exports = router;