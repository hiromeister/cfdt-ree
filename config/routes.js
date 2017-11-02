let homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');
const permissions = require('/permissions')

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/signup', homeController.signup);
    app.get('/home',permissions.can('access admin page'),homeController.login);

    app.get('/', homeController.loggedIn, homeController.home);
    app.get('/home', homeController.loggedIn, homeController.home);

    //Routes votants
    app.get('/ajouter-votants', voterController.loggedIn, voterController.add);
    app.get('/liste-votants', voterController.loggedIn, voterController.list);
    app.post('/addname', voterController.loggedIn, voterController.addname);

    //Routes votes
    app.get('/creer-vote', voteController.loggedIn, voteController.add);
    app.get('/liste-votes', voteController.loggedIn, voteController.list);
    app.post('/addvote', voteController.loggedIn, voteController.post);
    

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

}



