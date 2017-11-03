let homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');
const permissions = require('./permissions')

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/',permissions.can('access admin page'),homeController.loggedIn, homeController.login);


    /* ********** ADMIN ********** */
    
    //app.get('/', homeController.loggedIn, homeController.home);
    app.get('/home',permissions.can('access admin page'), homeController.loggedIn, homeController.home);

    // ADMIN Routes votants
    app.get('/ajouter-votants',permissions.can('access admin page'), voterController.loggedIn, voterController.add);
    app.get('/liste-votants', permissions.can('access admin page'),voterController.loggedIn, voterController.list);

    app.post('/voter/new', permissions.can('access admin page'),voterController.createNewVoter);

    // ADMIN Routes votes
    app.get('/creer-vote', permissions.can('access admin page'),voteController.loggedIn, voteController.add);
    app.get('/liste-votes',permissions.can('access admin page'), voteController.loggedIn, voteController.list);
    app.post('/addvote', permissions.can('access admin page'),voteController.loggedIn, voteController.post);
    

    /* ********** VOTANT ********** */

    // VOTANT routes acceuil
    app.get('/homeVoter', voterController.loggedIn, voterController.homeVoter);
    app.get('/logout', function(req, res){

      req.logout();
      res.redirect('/login');
    });

    app.get('/choix', voterController.loggedIn, voterController.choice);




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