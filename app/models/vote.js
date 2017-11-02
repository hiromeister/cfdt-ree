const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: String,
    r1: String,
    r2: String

});

let Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;