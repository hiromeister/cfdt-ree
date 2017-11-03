const mongoose = require('mongoose');

let VoterSchema = new mongoose.Schema({
    Syndicats: String,
    HorsPac: Number,
    Total: Number,
    Delegues: Number,
    Mandats: Number,
    Conseillers: Number
});

let User = mongoose.model("User", VoterSchema);
module.exports = User;