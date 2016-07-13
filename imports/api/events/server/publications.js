import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Events } from '../events.js';
import { Volunteers } from '../../volunteers/volunteers.js';
import { Organizations } from '../../organizations/organizations.js';
import { EventCategories } from '../../event-categories/event-categories.js';
import { EventDonations } from '../../event-donations/event-donations.js';

import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('events', function(){

	if(!this.userId) {
		return this.ready();
	}

	return Events.find({});
});

Meteor.publish('events.public', function(){
	return Events.find({});
});

Meteor.publish('events.single', function(id){
	return Events.find(id);
});

Meteor.publish('events.volunteered', function(segment){
		this.autorun(function(){
			let volunteers = Volunteers.find({ volunteerId: this.userId }, {fields: { eventId: 1 }});
			let eventIDs = [];

			volunteers.map((volunteer)=>{
				eventIDs.push(volunteer.eventId);
			})

			let today = new Date();
			let events = Events.find({_id: {$in: eventIDs}, scheduledDate:{	$gte: today }}, { sort: { scheduledDate:1 }}, { fields: Events.basicFields});
			Counts.publish(this, 'myEventsCount', Events.find({_id: {$in: eventIDs}}), { noReady: true });
  		return events;
		});
});

Meteor.publish('events.organized', function(){
		this.autorun(function(){
				let user = Meteor.users.findOne(this.userId)
				let organizationId = user.profile.organizationId;
				let organization = Organizations.findOne(organizationId);
				let today = new Date();
				let cursor = Events.find({organizationId:organizationId, scheduledDate:{	$gte: today }}, { fields: Events.basicFields});
				Counts.publish(this, 'myEventsCount', Events.find({organizationId:organizationId, scheduledDate:{	$gte: today }}), { noReady: true });
				return cursor;
			});
});

Meteor.publish('events.sponsored', function(){
		this.autorun(function(){
				let user = Meteor.users.findOne(this.userId);
				let sponsorId = user.profile.sponsorId;

				let donations = EventDonations.find({sponsorId:sponsorId}, {fields:{ eventId: 1 }});

				let eventIds = [];

				donations.map((donation)=>{
					eventIds.push(donation.eventId)
				});

				let uniqueEventIds = _.uniq(eventIds);
								console.log(uniqueEventIds);
				let today = new Date();
				let cursor =  Events.find({_id: {$in: uniqueEventIds}, scheduledDate:{ $gte: today }},{fields: Events.basicFields });
				Counts.publish(this, 'myEventsCount', Events.find({_id: {$in: uniqueEventIds}, scheduledDate:{ $gte: today }}), { noReady: true });
				return cursor;
			});
});

Meteor.publish('events.executed', function(){
		let user = Meteor.users.findOne(this.userId)
		let organizationId = user.profile.organizationId;
		let organization = Organizations.findOne(organizationId);
		let today = new Date();
		let cursor = Events.find({organizationId:organizationId, scheduledDate:{	$lt: today }});
		return cursor;
});

Meteor.publish('events.executedCount', function(){
		let user = Meteor.users.findOne(this.userId)
		let organizationId = user.profile.organizationId;
		let organization = Organizations.findOne(organizationId);
		let today = new Date();
		let cursor = Events.find({organizationId:organizationId, scheduledDate:{	$lt: today }});
		Counts.publish(this, 'myExecutedEventsCount', cursor, { noReady: true });
});

Meteor.publish('events.organization', function(eventId){
		let event = Events.findOne({ _id: eventId }, {fields:{ organizationId: 1 }});
		return Organizations.find({ _id: event.organizationId }, {fields: Organizations.basicFields });
});

Meteor.publish('events.search', function(searchCriteria, limit, category, city) {

    if (searchCriteria == null)
        searchCriteria = '';

		if (category == null)
        category = '';

		if (city == null)
        city = '';

		Counts.publish(this, 'cantidadEventos', Events.find({
			$and:[
				{'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
				{'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
				{
					$or: [
					{'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
					{'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
				]
				}
			]
    }), { noReady: true });

    let events = Events.find({
			$and:[
				{'city': {'$regex': '.*' + city || '' + '.*', '$options' : 'i' }},
				{'category': {'$regex': '.*' + category || '' + '.*', '$options' : 'i' }},
				{
					$or: [
					{'name': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
					{'description': {'$regex': '.*' + searchCriteria || '' + '.*', '$options' : 'i' }},
				]
				}
			]
    },{
			limit: limit
		}, { fields: Events.basicFields});

		return events;
});
