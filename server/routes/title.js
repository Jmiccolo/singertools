const express = require("express");
const router = express.Router();
const {checkAdmin, loginRequired, checkOwner} = require("../middleware");
const {getTitles, updateTitle, deleteTitle} = require("../handlers/title");

router.get("/", getTitles);
router.put("/:id", updateTitle);
router.delete("/:id", deleteTitle);

module.exports = router;