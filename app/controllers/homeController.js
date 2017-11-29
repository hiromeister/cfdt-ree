var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

const permissions = require('../../config/permissions');

var User = require('../models/user.js')
var Vote = require('../models/vote.js')

const request = require('request');

class homeController{

	loggedIn(req, res, next){
		if(req.session.user){next(); }
		else { res.redirect('/login'); }
	}
	
	// home(req, res){
		
	// 	let sortVote = User.find({statut:true}).select('vote');

	// 	sortVote.exec(function(err, users){
	// 		if(err){throw err}
	// 		else{ 
	// 			res.render('admin/dashboard.ejs', {yo: users, vote: vote})
	// 		}
	// 	});
	// }

	home(req,res){
		let sortTerLa = Vote.find({}).select('choix');
		sortTerLa.exec(function (err, vote){
			
			let sortVote = User.find({statut: true}).select('vote nbMandat');
			sortVote.exec(function (err, users){
				res.render('admin/dashboard.ejs',{
					vote: vote,
					yo:users,
				})
			})
	})
	

	


	}

	test(req, res){
		User.find({}, function(err, vote){
			res.render({vote: vote});
		})
	}

	signup(req, res){
		if (req.session.user) { res.redirect('/home'); } 
		else {
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

	VoterApi(req, res){
		let sortVote = User.find({}).select('vote');
		sortVote.exec(function(err, users){
			if(err){throw err}
			else{ return res.json(users) }
		});
	}

	vote5Api(req, res){
		let vote5 = Vote.find({}).select('choix');
		vote5.exec(function(err, votez){
			if(err) {throw err}
			else{return res.json(votez)}
		})
	}
	


}

module.exports = new homeController();
		
	

