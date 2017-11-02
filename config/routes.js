var homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');

// var addVotant = require('../app/controllers/voterController');
// var listeVotant = require('../app/controllers/voterController');
// var addname = require('../app/controllers/voterController');

// var addVote = require('../app/controllers/voteController');
// var addVotePost = require('../app/controllers/voteController');
// var votesList = require('../app/controllers/voteController');


//you can include all your controllers


module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/signup', homeController.signup);

    app.get('/', homeController.loggedIn, homeController.home);//home
    app.get('/home', homeController.loggedIn, homeController.home);//home

    //Routes votants
    app.get('/ajouter-votants', voterController.loggedIn, voterController.add);
    app.get('/liste-votants', voterController.loggedIn, voterController.list);
    app.post('/addname', voterController.loggedIn, voterController.addname);

    //Routes votes
    app.get('/creer-vote', voteController.loggedIn, voteController.add);
    app.get('/liste-votes', voteController.loggedIn, voteController.list);
    app.post('/addvote', voteController.loggedIn, voteController.post);
    

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



