const db = require("../models");

exports.createSong = function(req, res){
    req.body.text = req.body.text.replace(/\n/g, " <br> ").split(" ");
    db.Song.create(req.body)
    .then(song => {
        db.Singer.findById(req.body.user)
        .then(singer => {
            singer.songs.push(song);
            singer.save();
            res.status(200).json(song);
        })
        .catch(err => {
            db.Song.deleteOne(song);
            res.send("Song could not be uploaded, try again")
        })
    })
    .catch(err=>{
    console.log(err);
    res.send("Something went Wrong")})
}

exports.getSongs = function(req, res){
    db.Song.find(req.query).populate("user", "name")
    .then(songs => res.send(songs))
    .catch(err => res.send(err));
}

exports.getSong = function(req, res){
    db.Song.findById(req.params.id)
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