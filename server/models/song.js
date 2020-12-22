const mongoose = require("mongoose");
const db = require("../models");

const songSchema = new mongoose.Schema({
    title:String,
    composer:String,
    key: String,
    range: [String],
    user:{type:mongoose.Schema.Types.ObjectId, ref:"Singer"},
    text: [String],
    learned: {
        text:{type:Number, default:0},
        rhythym: {type:Number, default:0},
        melody: {type:Number, default:0},
        both:{type:Number, default:0},
        all:{type:Number, default:0}
    },
    beats: [
        {
            index:Number,
            action: String
        }
    ],
    createdAt: {type:Date, default:Date.now}
})


const Song = mongoose.model("Song", songSchema);
module.exports = Song;