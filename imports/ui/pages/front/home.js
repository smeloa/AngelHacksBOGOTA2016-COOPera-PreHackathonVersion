import './home.html';
import './home.css';
import '../../components/front/events/eventCard.js';
import '../../components/front/events/eventWide.js';

// import { Mongo } from 'meteor/mongo';
// import { ReactiveDict } from 'meteor/reactive-dict';
// import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles'
import { GAnalytics } from 'meteor/indesign:ganalytics'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { $ } from 'meteor/jquery';
import { Events } from '../../../api/events/events.js';

Template.home.onCreated(function homeCreated() {
	this.autorun((v) => {
		this.subscribe('events.public');
		this.subscribe('event-categories');
		this.subscribe('cities');
		this.subscribe('events.volunteers');
	});
});

Template.home.onRendered((v) => {

});



Template.home.events({

});

Template.home.helpers({
	events(){
		return Events.find();
	}
});
