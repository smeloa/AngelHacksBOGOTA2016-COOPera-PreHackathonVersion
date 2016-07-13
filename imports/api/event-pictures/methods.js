import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { EventPictures } from './event-pictures.js'


Meteor.methods({
	'event_pictures.create'(data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		EventPictures.insert(data);
	},
	'event_pictures.update'(objectId, data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		EventPictures.update({_id: objectId}, {$set: data});
	},
	'event_pictures.delete'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		EventPictures.remove({_id: objectId});
	},
});


/*
 * Rate limiting for methods
 * Only runs on server
 */
if(Meteor.isServer){
	// Get list of all method names on Lists
	const METHOD_NAMES = [
		'event_pictures.create',
		'event_pictures.update',
		'event_pictures.remove'
	];

	DDPRateLimiter.addRule({
	  	name(name) {
	    	return _.contains(METHOD_NAMES, name);
	  	},

	  	// Rate limit per connection ID
	  	connectionId() { return true; }
	}, 3, 1000*1);
}
