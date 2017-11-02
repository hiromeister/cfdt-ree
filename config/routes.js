var homeController = require('../app/controllers/homeController');

var addVotant = require('../app/controllers/voterController');
var listeVotant = require('../app/controllers/voterController');
var addname = require('../app/controllers/voterController');

var addVote = require('../app/controllers/voteController');
var addVotePost = require('../app/controllers/voteController');
var votesList = require('../app/controllers/voteController');


//you can include all your controllers


module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/signup', homeController.signup);

    app.get('/', homeController.loggedIn, homeController.home);//home
    app.get('/home', homeController.loggedIn, homeController.home);//home

    //Routes votants
    app.get('/ajouter-votants', addVotant.loggedIn, addVotant.addVotant);
    app.get('/liste-votants', listeVotant.loggedIn, listeVotant.listeVotant);
    app.post('/addname', addname.loggedIn, addname.addname);

    //Routes votes
    app.get('/creer-vote', addVote.loggedIn, addVote.addVote);
    app.get('/liste-votes', votesList.loggedIn, votesList.votesList);
    app.post('/addvote', addVotePost.loggedIn, addVotePost.addVotePost);
    

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

}



