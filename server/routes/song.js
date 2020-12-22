const express = require("express");
const router = express.Router();
const {checkAdmin, loginRequired, checkOwner} = require("../middleware");
const {createSong, getSongs, getSong, updateSong, deleteSong} = require("../handlers/song");

router.get("/", getSongs);
router.post("/new", createSong);
router.get("/:id", getSong);
router.put("/:id", loginRequired, checkOwner, updateSong)
router.delete("/:id", loginRequired, checkOwner, deleteSong);

module.exports = router;