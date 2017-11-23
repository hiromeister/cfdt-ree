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

	home(req, res){

		Vote.find({}, function (err, dataVotant){
			 	res.render('admin/dashboard.ejs', {dataVotant:dataVotant});
				
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

	localApi(req, res){
		
		let sortVote = User.find({}).select('vote');
		sortVote.exec(function(err, users){
			if(err){throw err}
			else{  return res.json(users) }
		})
	}

		
	



	
}

module.exports = new homeController();
