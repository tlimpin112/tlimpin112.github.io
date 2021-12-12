const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const WordsSchema = new mongoose.Schema({
    word:String
}) ;
WordsSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Word",WordsSchema);