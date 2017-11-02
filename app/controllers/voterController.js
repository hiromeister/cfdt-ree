var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const User = require('../models/user');

class voterController {

    loggedIn(req, res, next){
        if(req.session.user){
            next();
        }else{
            res.redirect('./login');
        }
    }

    add(req, res){
        res.render('admin/addVoters.ejs');
    }

    list(req, res){
        User.find({}, function(err, profile){
            res.render('admin/listVoters', {profile: profile});
        })
    }

    addname(req, res){
     let myData = new User(req.body);
    myData.save()
    .then(item => {
        res.redirect("/ajouter-votants"); 
    })
    .catch(err => {
        res.status(400).send("Impossible de sauvegarder dans la db");
    });
    }
}

module.exports = new voterController();


// exports.loggedIn = function(req, res, next)
// {
// 	if (req.session.user) { // req.session.passport._id
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

// exports.addVotant = function(req, res) {
//     res.render('admin/addVoters.ejs', {
//      })
// }

// exports.listeVotant = (req, res) => {
//     User.find({}, function (err, profile){
//         res.render('admin/listVoters', {profile: profile});
//     })
// }

// exports.addname = (req, res) =>{
//     let myData = new User(req.body);
//     myData.save()
//     .then(item => {
//         res.redirect("/ajouter-votants"); 
//     })
//     .catch(err => {
//         res.status(400).send("Impossible de sauvegarder dans la db");
//     });
// }
