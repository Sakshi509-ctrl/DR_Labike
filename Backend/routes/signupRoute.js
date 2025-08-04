const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/signup");
const { logout } = require("../controller/logout");
const { getContactForms } = require("../controller/getContactForms");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/contact-forms", getContactForms);

module.exports = router;