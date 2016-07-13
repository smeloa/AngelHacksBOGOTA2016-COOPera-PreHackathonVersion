import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';


Meteor.startup(function() {
	Bert.defaults = {
		hideDelay: 3000, // Accepts: a number in milliseconds.
		style: 'fixed-top', // Accepts: fixed-top, fixed-bottom, growl-top-left,
		// growl-top-right, growl-bottom-left, growl-bottom-right.
		// type: 'default', // Accepts: default, success, info, warning, danger.
	};

	Accounts.onLogin(function(user) {
		if(typeof user !== "undefined"){
			setTimeout(function() {
				Bert.alert('Bienvenid@ ' + user.profile.name, 'success');
			}, 250);
		}
	});
});
