var mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/singertools', 
{useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});
mongoose.Promise = Promise;

module.exports.Singer = require("./singer");
module.exports.Song = require("./song");