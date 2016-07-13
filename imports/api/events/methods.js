import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Events } from './events.js'
import { Organizations } from '../../api/organizations/organizations.js'


Meteor.methods({
	'events.create'(data){
		const user = Meteor.users.findOne({_id: this.userId});

		if(user.profile.type != "ong") {
			throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		}

		let organization = Organizations.findOne(user.profile.organizationId)
		data.organizationId = organization._id;
		Events.insert(data);
	},
	'events.update'(objectId, data){
		const user = Meteor.users.findOne({_id: this.userId});

		if(user.profile.type != "ong") {
			throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		}

		let organization = Organizations.findOne(user.profile.organizationId)
		data.organizationId = organization._id;

		Events.update({_id: objectId}, {$set: data});
	},
	'events.delete'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		if(user.profile.type != "ong") {
			throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		}

		Events.remove({_id: objectId});
	},
	'events.toggleLoved'(objectId){
		const user = Meteor.users.findOne({_id: this.userId});

		if(!Roles.userIsInRole(user, 'admin', Roles.GLOBAL_GROUP)) {
			throw new Meteor.Error('not-allowed', 'No tienes permiso para realizar esta acción');
		}

		const event = Events.findOne({_id: objectId});

		if(!event){
			throw new Meteor.Error('not-found', 'No encontramos este objeto');
		}

		let loved = event.isLoved;

		if(loved){
			loved = false;
		}else{
			loved = true;
		}

		Events.update({_id: objectId}, {$set: {isLoved: loved}}, {bypassCollection2: true});

		return loved;
	},
});


/*
 * Rate limiting for methods
 * Only runs on server
 */
if(Meteor.isServer){
	// Get list of all method names on Lists
	const METHOD_NAMES = [
		'events.create',
		'events.update',
		'events.remove'
	];

	DDPRateLimiter.addRule({
	  	name(name) {
	    	return _.contains(METHOD_NAMES, name);
	  	},

	  	// Rate limit per connection ID
	  	connectionId() { return true; }
	}, 3, 1000*1);
}
