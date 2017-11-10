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
        //console.log(req.user);

        Vote.find({}, function (err, vote){

            res.render('voter/vote', {
                user: req.user,
                vote: vote
            });
        });           
    }

    choice(req,res){
        // console.log("choice(req.user) " + req.user);
        // console.log("choice(req.params.id) " + req.params.id);
        Vote.find({}, function (err, votes){
            // console.log("Vote.find(votes) " + votes);
            votes.filter((votefiltered) => {
                // console.log("votes.find(votefiltered) " + votefiltered);
                // console.log("votes.find(votefiltered._id) " + votefiltered._id);
                if(votefiltered._id == req.params.id){
                    // console.log("votes.find(votefiltered) APRES FILTER " + votefiltered);

                    res.render('voter/choix', {
                        user: req.user,
                        vote: votefiltered
                    });
                }
            });
        });         
    }

    confirmation(req,res){
        // console.log("confimation : Req body 'pour' : " + req.body.pour);
        // console.log("confimation : Req body 'contre' : " + req.body.contre);
        // console.log("confirmation : Req user 'pour' : " + req.user.vote[0].pour);
        // console.log("confirmation : Req user 'contre' : " + req.user.vote[0].contre);        
        // console.log("choice(req.user) " + req.user);
        // console.log("choice(req.params.id) " + req.params.id);
        Vote.find({}, function (err, votes){
            // console.log("Vote.find(votes) " + votes);
            votes.filter((votefiltered) => {
                // console.log("votes.find(votefiltered) " + votefiltered);
                // console.log("votes.find(votefiltered._id) " + votefiltered._id);
                if(votefiltered._id == req.params.id){
                    // console.log("votes.find(votefiltered) APRES FILTER " + votefiltered);

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

    avoter(req,res){
        console.log("avoter : Req body 'pour' : " + req.body.reponseOne);
        console.log("avoter : Req body : " + req.body);
        console.log("avoter : Req body 'contre' : " + req.body.reponseTwo);
        console.log("avoter : Req user 'pour' : " + req.user.vote[0].pour);
        console.log("avoter : Req user 'contre' : " + req.user.vote[0].contre);

        // user.findByIdAndUpdate(req.params.id,{
        //     $set : {
        //         pour : req.body.pour,
        //         contre : req.body.contre 
        //     },
        // });
  
        Vote.find({}, function (err, votes){
            // console.log("Vote.find(votes) " + votes);
            votes.filter((votefiltered) => {
                // console.log("votes.find(votefiltered) " + votefiltered);
                // console.log("votes.find(votefiltered._id) " + votefiltered._id);
                if(votefiltered._id == req.params.id){
                    // console.log("votes.find(votefiltered) APRES FILTER " + votefiltered);

                    res.render('voter/avoter', {
                        user: req.user,
                        vote: votefiltered,
                        // pour: req.body.pour,
                        // contre: req.body.contre,
                        reponseOne: req.body.reponseOne,
                        reponseTwo: req.body.reponseTwo
                    });
                }
            });
        });         
    }
}

module.exports = new voterController();