const db = require("../models");

exports.getTitles = (req, res)=>{
    db.Title.find()
        .then(titles=>{
            res.send(titles);
        })
        .catch(err=>{
            res.status(400).json({message:"Something Went Wrong"});
        })
}

exports.updateTitle = (req, res)=>{
    db.Title.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(title => {
            res.send(title);
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
}

exports.deleteTitle = (req, res)=>{
    db.Title.findByIdAndRemove(req.params.id)
        .then(title=>{
            res.status(200).json({message:"Song Deleted"});
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
}

module.exports = exports;