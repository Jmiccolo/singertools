const mongoose = require("mongoose");
const db = require("../models");

const titleSchema = new mongoose.Schema({
    title:String,
    composer:String,
    author: String,
    key: String,
    range: [String],
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"Singer"},
    text: [String],
    createdAt: {type:Date, default:Date.now}
})


const Title = mongoose.model("Title", titleSchema);
module.exports = Title;