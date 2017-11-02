var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const Vote = require('../models/vote');

exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.addVote = function(req, res){
    res.render('admin/createVote.ejs');
};

exports.addVotePost = function(req, res){
    
    let myData = new Votes(req.body);
    myData.save()
    .then(item => {
        res.redirect("/liste-votes"); 
    })
    .catch(err => {
        res.status(400).send("Impossible de sauvegarder dans la db");
    });  
}



exports.votesList = function(req, res){
    Vote.find({}, function(err, votes){
        res.render('admin/listVotes.ejs', { vote: vote});
    });
}

