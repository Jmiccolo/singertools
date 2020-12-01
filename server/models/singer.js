const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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