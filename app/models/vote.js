const mongoose = require('mongoose');

let VoteSchema = new mongoose.Schema({
    intitule: String,
    type: String,
    statut: String,
    choix: [mongoose.Schema.Types.Mixed]
        

});

let Vote = mongoose.model("vote", VoteSchema);
module.exports = Vote;


    