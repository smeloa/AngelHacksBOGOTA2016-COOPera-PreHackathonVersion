import './eventCreate.html';
import './eventCreate.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { EventCategories } from '../../../api/event-categories/event-categories.js';
import { Cities } from '../../../api/cities/cities.js';

Template.eventCreate.onCreated(function eventCreateOnCreated() {
	this.autorun((v) => {
		this.subscribe('event-categories');
		this.subscribe('cities');
	});
});

Template.eventCreate.onRendered(function eventCreateOnRendered() {
	$('#category, #city').dropdown();
});

Template.eventCreate.events({
	'submit #eventCreateForm'(event) {
     // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
     const target = event.target;

		const new_event = {
			name: target.name.value,
			description: target.detailedDescription.value,
			shortDescription: target.shortDescription.value,
			category: target.category.value,
			targetBudget: target.targetBudget.value,
			city: target.city.value,
			address: target.address.value,
			scheduledDate: target.scheduledDate.value,
			targetVolunteers: target.targetVolunteers.value,
			contactPhone: target.contactPhone.value
		}

		Meteor.call("events.create", new_event, (error, result) => {
			if(error){
				console.log("error", error);
			}
			else{
				target.reset();
				setTimeout(function() {
						Bert.alert('El evento ha sido creado!', 'success');
				}, 750);
				FlowRouter.go("home");
			}
		});

   }
});

Template.eventCreate.helpers({
	categories() {
		return EventCategories.find();
	},
	cities() {
		return Cities.find();
	}
});
