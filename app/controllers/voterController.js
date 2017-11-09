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

            res.render('voter/vote.ejs', {
                user: req.user,
                vote: vote
            });
        });           
    }

    choice(req,res){
        console.log(req.user);

        Vote.find({}, function (err, vote){
            res.render('voter/choix.ejs', {
                user: req.user,
                vote: vote
            });
        });           
    }

    confirmation(req,res){
        console.log("Req" + req.body.pour);
        console.log("Req" + req.user.vote[0].pour);
        console.log("Req" + req.user.vote[0].contre);
        Vote.find({}, function (err, vote){
            res.render('voter/confirmation.ejs', {
                user: req.user,
                vote: vote,
                pour: req.body.pour,
                contre: req.body.contre
            });
        });         
    } 

    avoter(req,res){
        console.log(req.user);
        console.log("Req" + req.body.contre);

        // user.findByIdAndUpdate(req.params.id,{
        //     $set : {
        //         pour : req.body.pour,
        //         contre : req.body.contre 
        //     },
        // });

        Vote.find({}, function (err, vote){
            res.render('voter/avoter.ejs', {
                user: req.user,
                pour: req.body.pour,
                contre: req.body.contre,
                vote: vote
            });
        });           
    }

    
}

module.exports = new voterController();