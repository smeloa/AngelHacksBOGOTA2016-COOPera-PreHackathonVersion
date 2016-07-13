import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Sponsors } from './sponsors.js'


Meteor.methods({
	'sponsors.create'(data){
		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Sponsors.insert(data);
	},
	'sponsors.update'(objectId, data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Sponsors.update({_id: objectId}, {$set: data});
	},
	'sponsors.delete'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Sponsors.remove({_id: objectId});
	},
});


/*
 * Rate limiting for methods
 * Only runs on server
 */
if(Meteor.isServer){
	// Get list of all method names on Lists
	const METHOD_NAMES = [
		'sponsors.create',
		'sponsors.update',
		'sponsors.remove'
	];

	DDPRateLimiter.addRule({
	  	name(name) {
	    	return _.contains(METHOD_NAMES, name);
	  	},

	  	// Rate limit per connection ID
	  	connectionId() { return true; }
	}, 3, 1000*1);
}
