// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { EventPictures } from '../event-pictures.js'
// import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('event-pictures', function(eventId){
	return EventPictures.find({ "metadata.eventId": eventId });
});
