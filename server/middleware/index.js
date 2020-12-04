require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");

exports.checkAdmin = function(req, res, next){
    let admin = decodeHeader(req.headers["authorization"]);
    if(admin){
        jwt.verify(admin, process.env.SECRET_KEY, function(err, decoded){
            if(decoded.email === "jmiccolo89@gmail.com"){
                next();
            }
            else{
                res.send("YOU ARE NOT ALLOWED TO DO THAT!");
            }
        })
    }
    else{
        res.send("Please Log In");
    }
}

exports.checkUser = function(req, res, next){
     let user = decodeHeader(req.headers["authorization"])
     if(user){
         jwt.verify(user, process.env.SECRET_KEY, function(err, decoded){
             db.Singer.findById(decoded.id)
             .then(singer => {
                 if(singer.id === req.params.id){
                     next();
                 }
                 else{
                     res.send("You are not allowed to do that.1")
                 }
             })
             .catch(err => res.send("You are not allowed to do that.2"))
     })
}
}

exports.checkOwner = function(req, res, next){
     let user = decodeHeader(req.headers["authorization"])
     if(user){
         jwt.verify(user, process.env.SECRET_KEY, function(err, decoded){
             db.Song.findById(req.params.id).populate("user")
             .then(song => {
                 if(decoded.id === song.user.id){
                     next();
                 }
                 else{
                     res.send("You are not allowed to do that.1")
                 }
             })
             .catch(err => {
             res.send("You are not allowed to do that.2")
             })
     })
}
else{
    res.send("Please Log In");
}
}

exports.loginRequired = function(req, res, next){
    let singer = decodeHeader(req.headers["authorization"]);
    if(singer){
        jwt.verify(singer, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                db.Singer.findById(decoded["id"])
                .then(singer=> {
                    if(singer){
                        next();
                    }
                    else{
                        res.status(403).json({message:"Please Log In 1"})
                    }
                })
            }
            else{
                res.status(403).json({message:"Please Log In2"})
            }
        })
    }
    else{
        res.status(403).json({message:"Please Log In 3"})
    }

}

function decodeHeader(header){
    if(header){
        const bearer = header.split(" ");
        const token = bearer[1];
        return token;
    }
    else{
        return null;
    }
}
