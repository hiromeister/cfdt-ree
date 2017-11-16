const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: String,
    choix : [String]
});

let Vote = mongoose.model("vote", VoteSchema);
module.exports = Vote;