var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

const permissions = require('../../config/permissions');

var User = require('../models/user.js')
var Vote = require('../models/vote.js')


class homeController{

	loggedIn(req, res, next){

		if(req.session.user){next(); }
		else { res.redirect('/login'); }
	}

	home(req, res){
		// Recuperer tous les votes
		Vote[4].find({}, function (err, election){

		    let sumMandat;
		    // Recuperer tous les users
        	User.find({}, function (err, users){
        		// Pour chacun des users
				users.forEach((currentUser) => {
					// Recuperer le nombre mandat
        			let mandatCurrentUser = currentUser.nbMandat;
        			let votesCurrentUser = currentUser.vote;
        			let mandatToPush = Number;

        			//Recherche du vote 5 dans les user.vote
        			for(let i = 0; i < (votesCurrentUser).length; i++){
		        		if(votesCurrentUser[i].idVote === election._id){
		        			//Lire le tableau de choix du user
		        			for(let j = 0; j < (votesCurrentUser[i].choix).length; j++){
		        				for(let k = 0; k < election.length; k++){
		        					if(votesCurrentUser[i].choix[j] === election.choix[k].nom){
		        						election.choix.mandatRecu += mandatCurrentUser;
                        
				                        User.findByIdAndUpdate(currentUser._id, { $set: { vote: currentUserVotes}}, { new: true }, function (err) {
				                            if (err) return handleError(err);
				    
				                        });
		        					}
		        				}
		        			}
						}
					}
        		});
        	});
    	});

		res.render('admin/dashboard.ejs', {
			error : req.flash("error"),
			success: req.flash("success"), 
			session:req.session,
		});
	}

	signup(req, res){

		if (req.session.user) {
			res.redirect('/home');
		} else {
			res.render('signup', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session
			});
		}
	}

	login(req, res){
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}

	logout(req, res){
		req.logout();
		res.redirect('/');
	}
}

module.exports = new homeController();
