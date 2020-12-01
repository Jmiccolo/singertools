const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    Title:String,
    Composer:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"Singer"},
    text: String,
    learned: {
        text:Number,
        rhythym:Number,
        melody: Number,
        both:Number,
        all:Number
    }
})

const Song = mongoose.model("Song", songSchema);
module.exports = Song;