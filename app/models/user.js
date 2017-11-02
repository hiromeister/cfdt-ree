
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({	
	
	nom: String,
	prenom: String,
	Syndicat: String,
	email: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	NbMandats : Number,
	password: { type: String, required: true }
});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);



