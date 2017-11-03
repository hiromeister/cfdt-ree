const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: String,
    r1: {type: String, default: "Pour"},
    r2: {type: String, default: "Contre"}

});

let Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;