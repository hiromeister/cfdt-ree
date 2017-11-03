let homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');
const permissions = require('./permissions')

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/signup', homeController.signup);
    app.get('/',permissions.can('access admin page'),homeController.loggedIn, homeController.login);

    //app.get('/', homeController.loggedIn, homeController.home);
    app.get('/home',permissions.can('access admin page'), homeController.loggedIn, homeController.home);

    // ADMIN Routes votants
    app.get('/ajouter-votants', voterController.loggedIn, voterController.add);
    app.get('/liste-votants', voterController.loggedIn, voterController.list);
    app.post('/addname', voterController.loggedIn, voterController.addname);

    // ADMIN Routes votes
    app.get('/creer-vote', voteController.loggedIn, voteController.add);
    app.get('/liste-votes', voteController.loggedIn, voteController.list);
    app.post('/addvote', voteController.loggedIn, voteController.post);
    // VOTANT routes acceuil
    app.get('/homeVoter', voterController.loggedIn, voterController.homeVoter);
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
  });

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