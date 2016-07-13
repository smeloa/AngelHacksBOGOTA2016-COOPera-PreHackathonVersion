import { Meteor } from 'meteor/meteor';
import { EventDonations } from '../event-donations.js'
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('event-donations', function(eventId){
	return EventDonations.find({eventId:eventId});
});
