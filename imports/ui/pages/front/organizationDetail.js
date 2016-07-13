import './organizationDetail.html';
import './organizationDetail.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.organizationDetail.onCreated(function organizationDetailOnCreated() {
	this.autorun((v) => {
		this.subscribe('subscription');
	});
});

Template.organizationDetail.onRendered(function organizationDetailOnRendered() {

});



Template.organizationDetail.events({
	'click .class'(event, instance) {
	}
});

Template.organizationDetail.helpers({
	helper() {
		return 'miaw';
	}
});