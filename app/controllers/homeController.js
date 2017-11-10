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
