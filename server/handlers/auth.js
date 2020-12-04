require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

exports.login = function(req, res){
    if(req.headers["authorization"]){
        const bearer = req.headers["authorization"].split(" ");
        console.log(bearer);
        const token = bearer[1];
        console.log(token);
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                let {id, token} = decoded
                db.Singer.findById(id)
                .then(singer=>{
                    if(singer){
                        res.send(singer)
                    }else{
                        console.log("From HEre")
                        res.status(403).json({message:"Could Not Find Singer1"})
                    }
                })
            }
            else{
                console.log(err);
                console.log("from There")
                res.status(403).json({message:"Could Not Find Singer2"});
            }
        })
    }else{
    db.Singer.findById(req.body.id).select("password")
        .then(singer=>{
            let{email, id, username} = singer;
           let isMatch = singer.comparePassword(req.body.password)
           if(isMatch){
               let token = jwt.sign({
                   id,
                   email,
                   username,
               },
               process.env.SECRET_KEY);
               res.status(200).json(singer, token);
           }
        })
    }
}