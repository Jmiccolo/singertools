const express = require("express");
const router = express.Router();
const {checkAdmin, loginRequired, checkOwner} = require("../middleware");
const {createSong, getSongs, getSong, updateSong, deleteSong} = require("../handlers/song");

router.get("/", loginRequired, getSongs);
router.post("/new", loginRequired, createSong);
router.get("/:id", loginRequired, getSong);
router.put("/:id", loginRequired, checkOwner, updateSong)
router.delete("/:id", loginRequired, checkOwner, deleteSong);

module.exports = router;