const mongoose = require('mongoose');

let VotesSchema = new mongoose.Schema({
    Intitule: String,
    Type: String

});


let Vote = mongoose.model("Vote", VotesSchema);
module.exports = Vote;