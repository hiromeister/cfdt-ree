var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
		let sortTerLa = Vote.find({}).select('choix _id');
		sortTerLa.exec(function (err, vote){
			
			let sortVote = User.find({statut: true}).select('vote nbMandat statut');
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
			});
	}
	firstStep(req,res){
		res.render('index');
	}
	firstConnect(req,res,next){
		async.waterfall([
			function(done) {
				crypto.randomBytes(20, function(err, buf) {
					var token = buf.toString('hex');
					done(err, token);
				});
			},
			function(token, done) {
				User.findOne({ email: req.body.email }, function(err, user) {
					if (!user) {
						req.flash('error', 'No account with that email address exists.');
						return res.redirect('/firstStep');
					}

					user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
        	done(err, token, user);
        });
    });
			},
			function(token, user, done) {
				var smtpTransport = nodemailer.createTransport({
					service: 'gmail',

					auth: {
						user: 'oinanaphone@gmail.com',
						pass: 'piyupiyu'
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'oinanaphone@gmail.com',
					subject: 'Node.js Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
					done(err, 'done');
				});
				req.flash("success", "Veuillez consulter vos mails. Vous pouvez fermer cette page! ");
			}
			], function(err) {
				if (err) return next(err);
				res.redirect('/firstStep');
			});

	}
	resetToken(req,res){

		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				req.flash('error', 'Password reset token is invalid or has expired.');
				return res.redirect('/firstStep');
			}
			res.render('reset', {
				user: req.user
			});

		});
	}
	postResetToken(req,res){

		async.waterfall([
			function(done) {
				User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
					if (!user) {
						req.flash('error', 'Password reset token is invalid or has expired.');
						return res.redirect('back');
					}

					user.password = req.body.password;
					user.resetPasswordToken = undefined;
					user.resetPasswordExpires = undefined;
					user.firstLogin = false;
					user.save(function(err) {
						req.logIn(user, function(err) {
							done(err, user);
						});
					});
				});
			},
			function(user, done) {
				var smtpTransport = nodemailer.createTransport({
					service: 'gmail',

					auth: {
						user: 'oinanaphone@gmail.com',
						pass: 'piyupiyu'
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'oinanaphone@gmail.com',
					subject: 'Your password has been changed',
					text: 'Hello,\n\n' +
					'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash('success', 'Success! Your password has been changed.');
					done(err);
				});
			}
			], function(err) {


				res.redirect('/login');
			});
	}
	


}

module.exports = new homeController();



