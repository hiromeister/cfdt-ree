let homeController = require('../app/controllers/homeController');
let voteController = require('../app/controllers/voteController');
let voterController= require('../app/controllers/voterController');

const permissions = require('./permissions')

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/',permissions.can('access admin page'),homeController.loggedIn, homeController.login);
    app.get('/logout', homeController.logout);


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
    app.get('/supprimer/vote/:id', permissions.can('access admin page'), voteController.loggedIn, voteController.delete);

    /* ********** VOTANT ********** */

    // VOTANT routes acceuil
    app.get('/homeVoter', voterController.loggedIn, voterController.homeVoter);
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




    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', 
        failureRedirect: '/signup', 
        failureFlash: true 
    }));

    app.post('/login', passport.authenticate('local-login', {
         successFlash: 'Welcome!',
        successRedirect: '/home',
        failureRedirect: '/login', 
        failureFlash: true 
    }));

}
