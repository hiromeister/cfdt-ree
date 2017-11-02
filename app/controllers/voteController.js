var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const Vote = require('../models/vote');

class voteController {

    loggedIn(req, res , next){
        if(req.session.user){
            next();
        }else{
            res.redirect('/login');
        }
    }

    add(req, res){
        res.render('admin/createVote.ejs');
    };

    list(req, res){
        Vote.find({}, function(err, votes){
            res.render('admin/listVotes', {votes: votes});
        })
    }

    post(req, res){
        let myData = new Vote(req.body);
        myData.save()
        .then(item => {
            res.redirect("/liste-votes"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    }
}

module.exports = new voteController();




// exports.loggedIn = function(req, res, next)
// {
// 	if (req.session.user) { // req.session.passport._id

// 		next();

// 	} else {

// 		res.redirect('/login');

// 	}

// }

// exports.addVote = function(req, res){
//     res.render('admin/createVote.ejs');
// };

// exports.addVotePost = function(req, res){
    
//     let myData = new Votes(req.body);
//     myData.save()
//     .then(item => {
//         res.redirect("/liste-votes"); 
//     })
//     .catch(err => {
//         res.status(400).send("Impossible de sauvegarder dans la db");
//     });  
// }



// exports.votesList = function(req, res){
//     Votes.find({}, function(err, votes){
//         res.render('admin/listVotes.ejs', { votes: votes});
//     });
// }