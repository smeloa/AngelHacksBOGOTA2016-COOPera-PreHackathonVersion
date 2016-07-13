import './eventWide.html';
import './eventWide.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.eventWide.onCreated(function eventWideOnCreated() {
	this.autorun((v) => {
		this.subscribe('subscription');
	});
});

Template.eventWide.onRendered(function eventWideOnRendered() {

});



Template.eventWide.events({
	'click .class'(event, instance) {
	}
});

Template.eventWide.helpers({
	helper() {
		return 'miaw';
	}
});