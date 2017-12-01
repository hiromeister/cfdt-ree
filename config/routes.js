let homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const permissions = require('./permissions')

const request = require('request');

var User = require('../app/models/user.js')

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/',permissions.can('access admin page'),homeController.loggedIn, homeController.login);
    app.get('/logout', homeController.logout);
    app.get('/home',permissions.can('access admin page'), homeController.loggedIn, homeController.home);

    //LOCAL API
    app.get('/api/stats', homeController.VoterApi);
    app.get('/api/vote5', homeController.vote5Api);
    
    /* ********** ADMIN ********** */
    
    //app.get('/', homeController.loggedIn, homeController.home);
    app.get('/home',permissions.can('access admin page'), homeController.loggedIn, homeController.home);

    // ADMIN Routes votants
    app.get('/ajouter-votants',permissions.can('access admin page'), voterController.loggedIn, voterController.add);
    app.get('/liste-votants', permissions.can('access admin page'),voterController.loggedIn, voterController.list);
    app.post('/voter/new', permissions.can('access admin page'),voterController.createNewVoter);

    app.get('/test', homeController.test);


    // ADMIN Routes votes
    app.get('/creer-vote', permissions.can('access admin page'),voteController.loggedIn, voteController.add);
    app.get('/liste-votes',permissions.can('access admin page'), voteController.loggedIn, voteController.list);
    app.post('/addvote', permissions.can('access admin page'),voteController.loggedIn, voteController.post);
    app.get('/supprimer/:id', permissions.can('access admin page'), voteController.loggedIn, voteController.delete);
    app.get('/status/:id',permissions.can('access admin page'),voteController.loggedIn,voteController.on);



    /* ********** VOTANT ********** */

    // VOTANT routes acceuil
    app.get('/homeVoter', voterController.loggedIn, voterController.homeVoter,homeController.firstConnect);
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
  });

    app.get('/choix/vote/:id', voterController.loggedIn, voterController.choice);
    app.get('/choixE/vote/:id', voterController.loggedIn, voterController.choiceE);
    // app.get('/confirmation', voterController.loggedIn, voterController.confirmation);
    app.post('/confirmation/vote/:id', voterController.loggedIn, voterController.confirmation);
    app.post('/confirmationE/vote/:id', voterController.loggedIn, voterController.confirmationE);
    // app.get('/avoter', voterController.loggedIn, voterController.avoter);
    app.post('/avoter/vote/:id', voterController.loggedIn, voterController.avoter);
    app.post('/avoterE/vote/:id', voterController.loggedIn, voterController.avoterE);
    app.get('/effacer/:id', permissions.can('access admin page'), voterController.loggedIn, voterController.delete);
    app.get('/presence/:id',permissions.can('access admin page'),voterController.loggedIn,voterController.presence);


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', 
        failureRedirect: '/signup', 
        failureFlash: true 
    }));

    app.post('/login', passport.authenticate('local-login', {
       successRedirect: '/home',
       failureRedirect: '/login', 
       failureFlash: true 
   }));
    // mot de passe perdu
    app.get('/firstStep',homeController.firstStep);
    app.post('/firstConnect',homeController.firstConnect);
    // renouvellemetn/confirmation mot de passe
    app.get('/reset/:token',homeController.resetToken);
    app.post('/reset/:token',homeController.postResetToken);

}
