require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");

exports.checkAdmin = function(req, res, next){
    let admin = decodeHeader(req.headers["authorization"])
    console.log(admin);
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
                 if(singer){
                     req.body = {new:req.body, old:singer}
                     next();
                 }
                 else{
                     res.send("You are not allowed to do that.1")
                 }
             })
             .catch(err => res.send("You are not allowed to do that.2"))
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
                next();
            }
            else{
                res.status(403).json({message:"Please Log In"})
            }
        })
    }
    else{
        res.status(403).json({message:"Please Log In"})
    }

}

function decodeHeader(header){
    console.log(header);
    if(header){
        const bearer = header.split(" ");
        const token = bearer[1];
        return token;
    }
    else{
        return null;
    }
}
