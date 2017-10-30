const mongoose = require('mongoose');

let VotesSchema = new mongoose.Schema({

    Intitule: String,
    Type: String

});

let Votes = mongoose.model("Vote", VotesSchema);
module.exports = Votes;