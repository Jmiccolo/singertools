const express = require("express");
const router = express.Router();
const {getSingers, getSinger, createSinger, updateSinger, deleteSinger, addSong} = require("../handlers/singer");
const {checkAdmin, loginRequired, checkUser} = require("../middleware")

router.get("/", checkAdmin, getSingers);
router.post("/new", createSinger);
router.get("/:id", loginRequired, getSinger);
router.put("/:id", loginRequired, checkUser, updateSinger);
router.delete("/:id", loginRequired, checkUser, deleteSinger);
router.put("/:id/addSong", loginRequired, addSong)





module.exports = router;