import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { EventDonations } from './event-donations.js'


Meteor.methods({
	'event_donations.create'(data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		if(user.profile.type == "volunteer"){
			data.type = "volunteer";
		}else{
			let sponsorId = user.profile.sponsorId;
  		data.sponsorId = sponsorId;
			data.type = "sponsor";
		}

		EventDonations.insert(data);
	},
	'event_donations.update'(objectId, data){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		EventDonations.update({_id: objectId}, {$set: data});
	},
	'event_donations.delete'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		// if(!Roles.userIsInRole(user, 'organization', 'default-group')) {
		// 	throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		// }

		EventDonations.remove({_id: objectId});
	},
});


/*
 * Rate limiting for methods
 * Only runs on server
 */
if(Meteor.isServer){
	// Get list of all method names on Lists
	const METHOD_NAMES = [
		'cities.create',
		'cities.update',
		'cities.remove'
	];

	DDPRateLimiter.addRule({
	  	name(name) {
	    	return _.contains(METHOD_NAMES, name);
	  	},

	  	// Rate limit per connection ID
	  	connectionId() { return true; }
	}, 3, 1000*1);
}
