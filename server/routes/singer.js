const express = require("express");
const router = express.Router();
const {getSingers, getSinger, createSinger, updateSinger} = require("../handlers/singer");
const {checkAdmin, loginRequired, checkUser} = require("../middleware")

router.get("/", checkAdmin, getSingers)
router.post("/new", createSinger);
router.get("/:id", loginRequired, getSinger)
router.put("/:id", loginRequired, checkUser, updateSinger)



module.exports = router;