var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

class homeController{

	loggedIn(req, res, next){

		if(req.session.user){
			next();
		}else {
			res.redirect('/login');
		}
	}

	home(req, res){

		res.render('admin/menu.ejs', {
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

		if (req.session.user) {
			res.redirect('/home');
		} else {
			res.render('login', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session
			});
	
		}
	}
}

module.exports = new homeController();