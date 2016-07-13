// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js'
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('event-volunteers', function(eventId){

	if(!this.userId) {
		return this.ready();
	}

	return Volunteers.find({ eventId: eventId});
});

Meteor.publish('volunteers', function(){
		return Volunteers.find({}, { sort: { scheduledDate:1 }});
});
