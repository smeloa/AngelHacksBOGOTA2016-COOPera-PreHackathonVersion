import './eventCard.html';
import './eventCard.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { moment } from 'meteor/momentjs:moment';

Template.eventCard.onCreated(function eventCardOnCreated() {
	this.autorun((v) => {
		this.subscribe('event-donations', Template.instance().data._id);
		this.subscribe('event-pictures', Template.instance().data._id);
	});
});

Template.eventCard.onRendered(function eventCardOnRendered() {
});

Template.eventCard.events({
	'click .card'(event, instance) {
		FlowRouter.go("eventDetail", { id: this._id })
	}
});

Template.eventCard.helpers({
	date() {
		return moment(this.scheduledDate).format("DD/MM/YYYY")
	},
	progress(){
		$('#donationProgress' + this._id).progress({
			percent: this.donationProgressCapped()
		});
	}
});
