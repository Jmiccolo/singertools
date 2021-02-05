require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

exports.getSingers = function(req, res){
    db.Singer.find({})
    .then(singers => res.json(singers))
    .catch(err => res.send(err))
}

exports.getSinger = function(req, res){
    db.Singer.findById(req.params.id)
    .then(singer => {
        if(singer){
            res.json(singer)
        }
        else{
            res.status(403).json({message:"Cannot be Found"});
        }})
    .catch(err => res.send(err));
}

exports.createSinger = function(req, res){
    console.log(req.body)
    db.Singer.create(req.body)
    .then(singer=>{
        if(!singer){
            res.send("Something went wrong")
        }else{
        let {id, email, username} = singer;
        let token = jwt.sign({
            id,
            email,
            username
        },
        process.env.SECRET_KEY)
        res.status(200).json({singer, token})
        }
    })
    .catch(err=> {console.log(err); res.send(err)})
}

exports.updateSinger = function(req, res){
        db.Singer.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(singer => {
            res.send(singer);
        })
        .catch(err =>{
            console.log(err);
            res.send(err);
        })
}
exports.deleteSinger = function(req, res){
    db.Singer.findById(req.params.id)
    .then(singer=> {
        singer.remove()
        .then(response => res.send("Thank you for using Singer Tools"))
        .catch(err =>  res.send(err));
        })
    .catch(err => res.send(err));
}

exports.addSong = function(req, res){
    console.log(req.params.id, req.body.id);
    db.Singer.findById(req.params.id)
    .then(singer => {
        db.Song.findById(req.body.id)
        .then(song => {
            song.user = singer;
            song.learned = {
                text:0,
                rhythym: 0,
                melody: 0,
                both:0,
                all:0
            }
            song._id = new mongoose.Types.ObjectId();
            song.isNew = true;
            song.save();
            singer.songs.push(song);
            singer.save();
            console.log(singer)
            res.send(singer);
        })
        .catch(err=> {
            console.log(err)
            res.send(err);    
        })
    })    
    .catch(err=> {
        console.log(err)
        res.send(err)
    });
    }

exports.getSongs = function(req, res ){
    db.Song.find({user:req.params.id})
        .populate("title")
        .then(songs=>{
            res.send(songs);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json({message:"Something went wrong"});
        })
}
module.exports = exports;