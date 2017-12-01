const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const User = require('../models/user');
const Vote = require('../models/vote.js')

class voterController {

    loggedIn(req, res, next){        
        if(req.session.user){next(); }
        else { res.redirect('/login'); }
    }

    add(req, res){
        res.render('admin/addVoters.ejs');
    }

    list(req, res){
        User.find({}, function(err, profile){
            res.render('admin/listVoters', {profile: profile});
        });
    }

    createNewVoter(req,res){        
        var myData = new User(req.body);

        myData.save()
        .then(item => {
            res.redirect("/ajouter-votants"); 
        })

        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });
    }

    homeVoter(req,res){
        User.find({_id:req.user.id}, function(err, user){
            user.filter((userfiltered) => {
                if(userfiltered.firstLogin == false){


                    Vote.find({}, function (err, vote){
                        res.render('voter/vote', {
                            user: req.user,
                            vote: vote

                        }); 
                    });
                } else res.redirect('/firstStep');
            }); 
        });  

    }

    choice(req,res){
        Vote.find({}, function (err, votes){
            votes.filter((votefiltered) => {
                if(votefiltered._id == req.params.id){
                    res.render('voter/choix', {
                        user: req.user,
                        vote: votefiltered
                    });
                }
            });
        });         
    }


    choiceE(req,res){
        Vote.find({}, function (err, votes){
            votes.filter((votefiltered) => {
                if(votefiltered._id == req.params.id){
                    res.render('voter/choixE', {
                        user: req.user,
                        vote: votefiltered
                    });
                }                
            });
        });         
    }    

    confirmation(req,res){

        User.find({_id:req.user._id,'vote.idVote':req.params.id},function(err,dejavoter){
            if(dejavoter.length == 0){
                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){

                            res.render('voter/confirmation', {
                                user: req.user,
                                vote: votefiltered,
                                pour: req.body.pour,
                                contre: req.body.contre
                            });
                            
                        }
                    });
                });
                req.flash("success", "Merci d'avoir voté.");
            } else {
                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){
                           req.flash("error", "Votre contribution au VOTE " + votefiltered.intitule.toUpperCase() + " a déjà été comptabilisé. Veuillez patienter jusqu'à l'ouverture du vote suivant.");
                           res.redirect("/homeVoter");
                       }
                   });
                });
            }
        });
    } 

    confirmationE(req,res){
        User.find({_id:req.user._id,'vote.idVote':req.params.id},function(err,dejavoter){
            if(dejavoter.length == 0){            
                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){
                            res.render('voter/confirmationE', {
                                user: req.user,
                                vote: votefiltered,
                                choix: req.body.choix,  
                            });
                        }
                    });
                });
                req.flash("success", "Merci d'avoir voté.");
            } else {
                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){
                           req.flash("error", "Votre contribution au VOTE " + votefiltered.intitule.toUpperCase() + " a déjà été comptabilisé. Veuillez patienter jusqu'à l'ouverture du vote suivant.");
                           res.redirect("/homeVoter");
                       }
                   });
                });
            }
        });
    }    

    avoter(req,res){
        //Récupérer tous les votes
        User.find({_id:req.user._id,'vote.idVote':req.params.id},function(err,dejavoter){

            if(dejavoter.length == 0){
                Vote.find({}, function (err, votes){

                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){

                            //récupérer l'utilisateur connecté
                            var userLogged = req.user;
                            var date = Date();
                            
                            //Récupérer les votes de l'utilisateur connecté
                            User.findOne({_id:userLogged._id}, function(err, currentVotant){

                                var currentUserVotes = currentVotant.vote;
                                //Ajouter le nouveau vote aux votes précédemment enregistré 
                                currentUserVotes.push({idVote:req.params.id, pour: req.body.pour, contre: req.body.contre, createdAt: date});
                                
                                //Sauvegarder le vote en écrasannt le tableau de vote par celui qu'on a créé au-dessus(juste au-dessus)
                                User.findByIdAndUpdate(currentVotant._id, { $set: { vote: currentUserVotes}}, { new: true }, function (err) {
                                    if (err) return handleError(err);
                                    
                                });
                            });

                            res.render('voter/avoter', {
                                user: req.user,
                                vote: votefiltered,
                                pour: req.body.pour,
                                contre: req.body.contre
                            });
                        }
                    });
                }); 
            } else { 
                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){
                           req.flash("error", "Votre contribution au VOTE " + votefiltered.intitule.toUpperCase() + " a déjà été comptabilisé. Veuillez patienter jusqu'à l'ouverture du vote suivant.");
                           res.redirect("/homeVoter");
                       }
                   });
                });
            }
        });       
    }

    avoterE(req,res){   
        //Récupérer tous les votes
        User.find({_id:req.user._id,'vote.idVote':req.params.id},function(err,dejavoter){

            if(dejavoter.length == 0){
                //Récupérer tous les votes
                Vote.find({}, function (err, votes){

                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){

                            //récupérer l'utilisateur connecté
                            var userLogged = req.user;
                            var date = Date();                    
                            
                            //Récupérer les votes de l'utilisateur connecté
                            User.findOne({_id:userLogged._id}, function(err, currentVotant){

                                var currentUserVotes = currentVotant.vote;
                                //Ajouter le nouveau vote aux votes précédemment enregistré 
                                currentUserVotes.push({idVote:req.params.id, choix: req.body.choix, createdAt: date});
                                
                                //Sauvegarder le vote en écrasant le tableau de vote par celui qu'on a créé au-dessus(juste au-dessus)
                                User.findByIdAndUpdate(currentVotant._id, { $set: { vote: currentUserVotes}}, { new: true }, function (err) {
                                    if (err) return handleError(err);
                                }
                                );

                            });

                            res.render('voter/avoter', {
                                user: req.user,
                                vote: votefiltered,
                                choix: req.body.choix,
                            });
                        }
                    });
                });         
            } else {

                Vote.find({}, function (err, votes){
                    votes.filter((votefiltered) => {
                        if(votefiltered._id == req.params.id){
                           req.flash("error", "Votre contribution au VOTE " + votefiltered.intitule.toUpperCase() + " a déjà été comptabilisé. Veuillez patienter jusqu'à l'ouverture du vote suivant.");
                           res.redirect("/homeVoter");
                       }
                   });
                });
            }
        });       
    }
    
    delete(req, res){
        User.find({}, function (err, users){
            users.filter((userfiltered) => {
                if(userfiltered._id == req.params.id){
                    //récupérer l'utilisateur connecté
                    User.findByIdAndRemove(userfiltered._id,function (err,user) {
                        if (err) return err;

                    });
                } 
            });
            res.redirect("/liste-votants");
        });
    }

    presence(req,res){        
        User.find({}, function (err, users){

            users.filter((userfiltered) => {

                if(userfiltered._id == req.params.id){
                    //récupérer l'utilisateur connecté
                    if( userfiltered.statut === false){
                        User.findByIdAndUpdate(userfiltered._id, { $set: { statut: true}}, { new: true }, function (err) {
                            if (err) return handleError(err);
                        });
                    } else {
                        User.findByIdAndUpdate(userfiltered._id, { $set: { statut: false}}, { new: true }, function (err) {
                            if (err) return handleError(err);

                        });
                    } 

                    res.redirect("/liste-votants");

                }
            });
        });
    }   
}

module.exports = new voterController();