var ConnectRoles = require('connect-roles');
var permissions = new ConnectRoles({
	failureHandler: function (req, res, action) {
        // optional function to customise code that runs when user fails authorisation
        var accept = req.headers.accept || '';
        res.status(403);
        if (~ accept.indexOf('html')) {
            //If the user doesn't have permissions but has the "user" role 
            //then he is redirected to the user home page
            if (req.user === undefined) {res.redirect('/login');}
            if(req.user.role === 'user'){
            	res.redirect('/homeVoter'); // TODO : change the url for the user homepage

            }
            else{
            	//If there is no user logged in then go to the login page
            	res.redirect('/login');
            }
        } else {
        	res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});


permissions.use('access admin page', function (req) {
	if (req.user !== undefined && req.user.role === 'admin') {
		return true;
	}
})

//admin users can access all pages
permissions.use(function (req) {
	if (req.user !== undefined && req.user.role === 'admin') {
		return true;
	}
});

module.exports = permissions;