import './eventEdit.html';
import './eventEdit.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
// import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';
// import { ReactiveVar } from 'meteor/reactive-var';
import { EventCategories } from '../../../api/event-categories/event-categories.js';
import { Cities } from '../../../api/cities/cities.js';
import { Events } from '../../../api/events/events.js';

Template.eventEdit.onCreated(function eventEditOnCreated() {
	this.id = FlowRouter.getParam("id");
	this.autorun((v) => {
		this.subscribe('events.single', FlowRouter.getParam("id"));
		this.subscribe('event-categories');
		this.subscribe('cities');
	});
});

Template.eventEdit.onRendered(function eventEditOnRendered() {
	this.autorun((v) => {
			$('#category, #city').dropdown();
	});
});

Template.eventEdit.events({
	'submit #eventEditForm'(event) {
     // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
   const target = event.target;
   const id = Template.instance().id;
   const event_data = {
       name: target.name.value,
			 description: target.detailedDescription.value,
			 shortDescription: target.shortDescription.value,
       category: target.category.value,
       targetBudget: target.targetBudget.value,
       city: target.city.value,
       address: target.address.value,
       scheduledDate: moment(target.scheduledDate.value).startOf('day').format(),
       targetVolunteers: target.targetVolunteers.value,
       contactPhone: target.contactPhone.value
   }

		Meteor.call("events.update", id, event_data, (error, result) => {
			if(error){
				console.log("error", error);
			}
			else{
				target.reset();
				setTimeout(function() {
						Bert.alert('El evento ha sido actualizado!', 'success');
				}, 750);
				FlowRouter.go("eventDetail", { id: id } );
			}
		});

	},
	'click .delete'(event) {
		event.preventDefault();
		const id = Template.instance().id;
		Meteor.call("events.delete", id, function(error, result){
			if(error){
				console.log("error", error);
			}
			else{
				setTimeout(function() {
						Bert.alert('El evento ha sido eliminado!', 'danger');
				}, 750);
				FlowRouter.go("home");
			}
		});
	}
});

Template.eventEdit.helpers({
	event(){
		return Events.findOne();
	},
	categories() {
		return EventCategories.find();
	},
	cities() {
		return Cities.find();
	},
	selectedCategory(c) {
    if(Events.findOne().category === c) {
      return "selected";
    }
  },
	selectedCity(c) {
    if(Events.findOne().city === c) {
      return "selected";
    }
  }
});
