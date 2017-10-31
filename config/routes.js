var home = require('../app/controllers/homeController');

var addVotant = require('../app/controllers/votersController');
var listeVotant = require('../app/controllers/votersController');
var addname = require('../app/controllers/votersController');

var addVote = require('../app/controllers/votesController');
var addVotePost = require('../app/controllers/votesController');
var votesList = require('../app/controllers/votesController');


//you can include all your controllers


module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home

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



