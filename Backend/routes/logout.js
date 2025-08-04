const express = require("express");
const router = express.Router();
const { logout } = require("../controller/logout");




router.post("/logout", logout);

module.exports = router;