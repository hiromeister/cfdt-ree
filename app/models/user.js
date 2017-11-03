var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({	
	nom: String,
	prenom: String,
	syndicat: String,
	email: String,
	nbMandat : Number,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	password: { type: String, required: true },
	role: {type:String, default: "member"},
	//isAdmin: {type:Boolean, default: "false"}
	
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
userSchema.methods.isMember = function() {
    return (this.role === "member");
};
userSchema.methods.isAdmin = function() {
    return (this.role === "admin");
};

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);