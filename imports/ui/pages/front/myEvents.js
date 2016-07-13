import './myEvents.html';
import './myEvents.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../../../api/events/events.js';

Template.myEvents.onCreated(function myEventsOnCreated() {
	this.autorun((v) => {
		this.subscribe('volunteers');
		this.subscribe('cities');
		this.subscribe('event-categories');
		this.subscribe('sponsors');
		if(Helpers.isVolunteer()){
			this.subscribe('events.volunteered');
		}
		else if(Helpers.isOrganization()){
			this.subscribe('events.organized');
		}
		else if(Helpers.isSponsor()){
			this.subscribe('events.sponsored');
		}
	});
});

Template.myEvents.onRendered(function myEventsOnRendered() {

});

Template.myEvents.events({
	// 'click .class'(event, instance) {
	// }
});

Template.myEvents.helpers({
	my_events() {
		return Events.find();
	},
	my_events_count(){
		return Counts.get("myEventsCount");
	},
	next_event(){
		return Events.findOne();
	}
});
