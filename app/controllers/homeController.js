var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').load();
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


		let sortTerLa = Vote.find({}).select('choix intitule');

		sortTerLa.exec(function (err, vote){
			
			let sortVote = User.find({statut: true}).select('vote nbMandat statut');
			sortVote.exec(function (err, users){
				res.render('admin/dashboard.ejs',{
					vote: vote,
					users: users,
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

				User.findOne({ email: req.user.email }, function(err, user) {
					if (!user) { 
						req.flash('error', 'No account with that email address exists.');
						return res.redirect('/login');
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
						user: process.env.SMTPUSER,
						pass: process.env.SMTPPASSWORD
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'oinanaphone@gmail.com',
					subject: 'Validation de nouveau mot de passe',
					text: 'Ceci est un message automatique generé lors de votre premiere connexion sur le site de vote de la CFDT\n\n' +
					'Veuillez cliquer sur le lien suivant pour aller sur la page de validation de mot de passe:\n\n' +
					'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					'Si vous etes deja connecté a votre espace de vote CFDT,ne tenez pas compte de ce message et votre mot de passe restera inchangé.\n'
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash("success", "Un mail vous a été envoyé.Veuillez consulter vos mails! ");
					done(err, 'done');
				});
				
			}
			], function(err) {
				if (err) return next(err);
				res.redirect('/login');
			});

	}
	resetToken(req,res){

		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				req.flash('error', 'Jeton de réinitialisation de mot de passe expiré ou inactif.');
				return res.redirect('/login');
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
						req.flash('error', 'Jeton de réinitialisation de mot de passe expiré ou inactif.');
						return res.redirect('back');
					}
					if(req.body.password.length <8){
						req.flash('error', 'Le mot de passe doit contenir au moins 8 caractères!');
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
						user: process.env.SMTPUSER,
						pass: process.env.SMTPPASSWORD
					}
				});
				var mailOptions = {
					to: user.email,
					from: 'oinanaphone@gmail.com',
					subject: 'Changement de mot de passe',
					text: 'Bonjour,\n\n' +
					"Ce message de confirmation a l'attention de  " + user.email + " pour vous avertir du changement de votre mot de passe.\n"
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					req.flash('success', 'Felicitation votre mot de passe a bien été changé.Vous pouvez vous connecter!');
					done(err);
				});
			}
			], function(err) {


				res.redirect('/login');
			});
	}
	


}

module.exports = new homeController();



