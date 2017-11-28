const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: {type:Boolean, default:false},
    choix: [String]
});
let Vote = mongoose.model("vote", VoteSchema);
module.exports = Vote;