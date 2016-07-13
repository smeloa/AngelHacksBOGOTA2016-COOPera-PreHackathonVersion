import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Organizations } from './organizations.js'


Meteor.methods({
	'organizations.create'(data){
		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Organizations.insert(data);
	},
	'organizations.update'(objectId, data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Organizations.update({_id: objectId}, {$set: data});
	},
	'organizations.delete'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		return Organizations.remove({_id: objectId});
	},
});


/*
 * Rate limiting for methods
 * Only runs on server
 */
if(Meteor.isServer){
	// Get list of all method names on Lists
	const METHOD_NAMES = [
		'organizations.create',
		'organizations.update',
		'organizations.remove'
	];

	DDPRateLimiter.addRule({
	  	name(name) {
	    	return _.contains(METHOD_NAMES, name);
	  	},

	  	// Rate limit per connection ID
	  	connectionId() { return true; }
	}, 3, 1000*1);
}
