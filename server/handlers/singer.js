require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken")

exports.getSingers = function(req, res){
    db.Singer.find({})
    .then(singers => res.json(singers))
    .catch(err => res.send(err))
}

exports.getSinger = function(req, res){
    db.Singer.findById(req.params.id)
    .then(singer => res.json(singer))
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
    if(req.body.old.id === req.params.id){
        db.Singer.findByIdAndUpdate(req.params.id, req.body.new, {new:true})
        .then(singer => {
            console.log(singer);
            res.send(singer);
        })
        .catch(err =>{
            console.log(err);
            res.send(err);
        })
    }
    else {
        res.send("You can't do that!");
    }
}

module.exports = exports;