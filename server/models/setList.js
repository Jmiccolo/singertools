const mongoose = require("mongoose");
const db = require("../models");

const setListSchema = new mongoose.Schema({
    title:String,
    songs:[{type:mongoose.Schema.Types.ObjectId, ref:"Song"}]
})


const SetList = mongoose.model("SetList", setListSchema);
module.exports = SetList;