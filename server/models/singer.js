const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../models");

const singerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password: {type: String, required:true, select:false},
    songs: [{type:mongoose.Schema.Types.ObjectId, ref:"Song"}],
})
singerSchema.pre("save", async function(next){
   try{
       if(!this.isModified("password")){
            return next();
        }
       let hashedPassword = await bcrypt.hash(this.password, 10);
       this.password = hashedPassword;
       return next();
   }
   catch(err) {
       return next(err);
   }
})
singerSchema.pre("remove", async function(next){
    console.log("from the pre remove")
    try{
        this.songs.forEach(song=>{
            db.Song.findByIdAndRemove(song._id)
            .then(res=> console.log("delete"))
            .catch(err => console.log(err));
        })
        next();
    }
    catch(err){
        console.log(err)
        next(err)
    }
})

singerSchema.methods.comparePassword = async function(submittedPassword, next){
    try{
        let isMatch = await bcrypt.compare(submittedPassword, this.password);
        return next(isMatch);
    }
    catch(err) {
        console.log(err);
        return next(err);
    }
}
const Singer = mongoose.model("Singer", singerSchema);
module.exports = Singer;