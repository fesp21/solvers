// Role checking is used on server and client side
roles = (function() {
	var admins = {
		"richardsmith404@gmail.com": true, /* Richard Smith */
		"davedx@gmail.com": true /* Dave Clayton */
	};

	var getEmail = function() {
		var user = Meteor.user();
		// first try email from regular signup
		if(user && user.emails && user.emails[0].verified)
			return user.emails[0].address;
		// then try 3rd party service email(s)
		if(user && user.services && user.services.github)
			return user.services.github.email;
		return '';
	};

	return {
		isAdmin: function() {
			var email = getEmail();
			return admins[email] === true;
		},
		findFullName: function (user) {
			if (user) {
				if(user.profile && user.profile.firstName) {
		      return (user.profile.firstName || '') + " " + (user.profile.lastName || '');
				}
				if (user.profile && user.profile.name) {
					return user.profile.name;
				}
				if (user.username) {
					return user.username;
				}
			}
			//console.error("Could not find user full name for: ", user);
			return "Unknown";
		}
	}
})();
