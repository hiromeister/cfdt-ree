const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({

    Intitule: String,
    Type: String

});

let Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;