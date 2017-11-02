const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: String,
    r1: "Pour",
    r2: "Contre"

});

let Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;