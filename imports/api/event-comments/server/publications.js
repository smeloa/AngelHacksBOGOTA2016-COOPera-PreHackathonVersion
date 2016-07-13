// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { EventComments } from '../event-comments.js'
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('event-comments', function(eventId){
	if(!this.userId) {
		return this.ready();
	}

	return EventComments.find({eventId: eventId},{ sort:{createdAt:-1}});
});
