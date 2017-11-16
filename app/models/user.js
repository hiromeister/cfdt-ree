var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({	
	nom: String,
	prenom: String,
	syndicat: String,
	email: String,
	nbMandat : Number,
	vote : [ mongoose.Schema.Types.Mixed ],
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	password: { type: String, required: true },
	role: {type:String, default: "user"},	
});

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

//Called before each save for hashing the password
userSchema.pre('save', function(next) {
	//hash the password
	this.password = this.generateHash(this.password);
	next();
  });


//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);