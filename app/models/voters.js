const mongoose = require('mongoose');

let votersSchema = new mongoose.Schema({
    Syndicats: String,
    HorsPac: Number,
    Total: Number,
    Delegues: Number,
    Mandats: Number,
    Conseillers: Number
});

let User = mongoose.model("User", votersSchema);
module.exports = User;