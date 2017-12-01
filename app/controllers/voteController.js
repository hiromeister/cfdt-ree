const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const Vote = require('../models/vote');
const User = require('../models/user');

class voteController {

    loggedIn(req, res , next){

        if(req.session.user){next(); }
        else { res.redirect('/login'); }
    }

    add(req, res){
        res.render('admin/createVote.ejs');
    };

    list(req, res){
        Vote.find({}, function(err, vote){
            res.render('admin/listVotes', {vote: vote });
        })
    }

    post(req, res){
        let myData = new Vote(req.body);
        
        myData.save()
        .then(item => {
            res.redirect("/liste-votes"); 
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        });  
    }  

    delete(req, res){
        Vote.find({}, function (err, votes){
            votes.filter((votefiltered) => {
                if(votefiltered._id == req.params.id){
                    //récupérer l'utilisateur connecté
                    Vote.findByIdAndRemove(votefiltered._id,function (err,vote) {
                        if (err) return err;
                    });
                } 
            });
            res.redirect("/liste-votes");
        });
    }

    on(req,res){
        Vote.find({}, function (err, votes){
    
            votes.filter((votefiltered) => {
                if(votefiltered._id == req.params.id){
                    //récupérer l'utilisateur connecté
                    if( votefiltered.statut === false){

                        Vote.findByIdAndUpdate(votefiltered._id, { $set: { statut: true}}, { new: true }, function (err) {
                            if (err) return handleError(err);
                        });
                    } else {
                        Vote.findByIdAndUpdate(votefiltered._id, { $set: { statut: false}}, { new: true }, function (err) {
                            if (err) return handleError(err);
                        });
                    } 

                    res.redirect("/liste-votes");
                }
            });
        });
    }
    
}

module.exports = new voteController();