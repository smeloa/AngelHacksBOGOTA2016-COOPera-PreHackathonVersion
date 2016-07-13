// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Sponsors } from '../sponsors.js'
import { EventDonations } from '../../event-donations/event-donations.js'

import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('sponsors', function(){
	return Sponsors.find();
});

Meteor.publish('event-sponsors', function(eventId){
	this.autorun(function(){
		let donations = EventDonations.find({eventId:eventId, type:"sponsor"}, {fields:{ sponsorId: 1 }});

		let sponsorIds = [];

		donations.map((donation)=>{
			sponsorIds.push(donation.sponsorId)
		});

		let uniqueSponsorIds = _.uniq(sponsorIds);
		return Sponsors.find({_id: {$in: uniqueSponsorIds}},{fields:{ _id: 1 }});
	});
});


Meteor.publish('sponsors.basic-info', function(){
	return Sponsors.find({}, {fields: Sponsors.basicFields});
});
