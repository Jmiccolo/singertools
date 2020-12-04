const express = require("express");
const router = express.Router();
const {login} = require("../handlers/auth")

router.post("/signin", login);

module.exports = router;