const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const User = require('../models/user');

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


    signup(req, res){

        let myData = new User(req.body);
        myData.save()
        .then(item => {
            res.redirect("/ajouter-votants"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });
        
                if (req.session.user) {
                    res.redirect('/home');
                } else {
                    res.render('signup', {
                        error : req.flash("error"),
                        success: req.flash("success"),
                        session:req.session
                    });
                }
            }
}

module.exports = new voterController();


