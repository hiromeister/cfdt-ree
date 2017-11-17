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
        })
    }

    createNewVoter(req,res){        
        let myData = new User(req.body);
       
        myData.save()
        .then(item => {
            res.redirect("/ajouter-votants"); 
        })
        
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });
    }

    homeVoter(req,res){
        Vote.find({}, function (err, vote){
            res.render('voter/vote', {
                user: req.user,
                vote: vote
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
    } 

    confirmationE(req,res){
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
    }     

    avoter(req,res){

        console.log("avoter : Req body 'pour' : " + req.body.reponseOne);
        console.log("avoter : Req body : " + req.body);
        console.log("avoter : Req body 'contre' : " + req.body.reponseTwo);
        console.log("avoter : Req user 'pour' : " + req.user.vote[0].pour);
        console.log("avoter : Req user 'contre' : " + req.user.vote[0].contre);
        

        Vote.find({}, function (err, votes){
            votes.filter((votefiltered) => {
                if(votefiltered._id == req.params.id){
                    let votant = req.user;
                    console.log(votant)
                    votant.update({}, { pour : req.body.reponseOne }, function(error) {
                    });
                    votant.update({}, { contre : req.body.reponseTwo }, function(error) {
                    });
                    res.render('voter/avoter', {
                        user: req.user,
                        vote: votefiltered,
                        reponseOne: req.body.reponseOne,
                        reponseTwo: req.body.reponseTwo
                    });
                }
            });
        });         
    }
}

module.exports = new voterController();