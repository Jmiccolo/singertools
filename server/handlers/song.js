const db = require("../models");

exports.createSong = function(req, res){
    req.body.text = req.body.text.replace(/\n/g, " <br/> ").split(" ");
    db.Title.create(req.body)
    .then(title => {
        db.Song.create({title:title})
        .then(song=>{
            song.text = title.text;
            song.user = title.creator;
            song.save();
    })
    .catch(err=>{
    console.log(err);
    res.send("Something went Wrong")})
        })
}

exports.getSongs = function(req, res){
    db.Song.find({title:req.params.id})
        .then(songs=>{
            res.send(songs);
        })
        .catch(err=>{
            res.status(400).json({message:"Something went wrong"});
            console.log(err);
        })
}

exports.getSong = function(req, res){
    db.Song.findById(req.params.id)
    .populate("title")
    .then(song=>res.send(song))
    .catch(err=>res.send(err));
}

exports.updateSong = function(req, res){
    db.Song.findById(req.params.id)
    .then(song => {
        db.Song.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(song => res.send(song))
        .catch(err => res.send(err));
        }
    )
    .catch(err => res.send(err));
}

exports.deleteSong = function(req, res){
    db.Song.findById(req.params.id)
    .then(async song=> {
        await db.Singer.findById(song.user)
        .then(singer=>{
            singer.songs.pull(song);
            singer.save();
        })
        song.remove();
        res.send("Song has been deleted");
    })
    .catch(err => res.send(err));
}
module.exports = exports;