import './register.html';
import './register.css';

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { EventCategories } from '../../../api/event-categories/event-categories.js'


Template.register.onCreated(function registerOnCreated() {
	this.autorun((v) => {
		this.subscribe('event-categories');
	});
});

Template.register.onRendered(function registerOnRendered() {

});



Template.register.events({
	'click .button.volunteer'(event, instance) {
		event.preventDefault();

		$('.segment.sponsor, .fa.sponsor').addClass('hidden');
		$('.segment.ong, .fa.ong').addClass('hidden');
		$('.segment.volunteer, .fa.volunteer').removeClass('hidden');
	},
	'click .button.sponsor'(event, instance) {
		event.preventDefault();

		$('.segment.sponsor, .fa.sponsor').removeClass('hidden');
		$('.segment.ong, .fa.ong').addClass('hidden');
		$('.segment.volunteer, .fa.volunteer').addClass('hidden');
	},
	'click .button.ong'(event, instance) {
		event.preventDefault();

		$('.segment.sponsor, .fa.sponsor').addClass('hidden');
		$('.segment.ong, .fa.ong').removeClass('hidden');
		$('.segment.volunteer, .fa.volunteer').addClass('hidden');
	},
	'submit #registerVolunteerForm'(event) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		let category = event.target.category;
		let categories = []

		for (var i = 0; i < category.length; i++) {
			if(category[i].checked){
				categories.push(category[i].value)
			}
		}

		const data = {
			email: event.target.email.value,
			password: event.target.password.value,
			profile: {
				name: event.target.name.value,
				categories: categories,
				phone: event.target.phone.value,
				type: "volunteer",
				source: 'web'
			}
		};

		Accounts.createUser(data, function(error) {
			$(event.currentTarget).removeClass('loading');

			if (error) {
				if (error.reason == "Email already exists.") {
					Bert.alert('El correo electrónico ya esta registrado', 'danger');
				}
			} else {
				$('#registerModal').modal('hide');
				// Meteor.call('users.sendVerificationLink');
				setTimeout(function() {
					Bert.alert('Bienvenid@ ' + Meteor.user().profile.name, 'success');
				}, 750);
			}
		});
	},
	'submit #registerOngForm'(event) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		const orgData = {
			name: event.target.company.value,
			description: event.target.description.value,
			address: event.target.address.value,
		  phone: event.target.phone.value,
			url: event.target.url.value
		};

		Meteor.call("organizations.create", orgData, (error, result) =>{
			if(error){
				console.log("error", error);
			}
			if(result){

				const userData = {
					email: event.target.email.value,
					password: event.target.password.value,
					profile: {
						name: event.target.name.value,
						organizationId: result,
						type: "ong",
						source: 'web'
					}
				};

				Accounts.createUser(userData, (error) => {
					$(event.currentTarget).removeClass('loading');
					if (error) {
						if (error.reason == "Email already exists.") {
							Bert.alert('El correo electrónico ya esta registrado', 'danger');
						}
					} else {
						$('#registerModal').modal('hide');
						// Meteor.call('users.sendVerificationLink');
						setTimeout(function() {
							Bert.alert('Bienvenid@ ' + Meteor.user().profile.name, 'success');
						}, 750);
					}
				});
			}
		});


	},
	'submit #registerSponsorForm'(event) {
		event.preventDefault();

		$(event.currentTarget).addClass('loading');

		const sponsorData = {
			name: event.target.company.value,
			address: event.target.address.value,
			phone: event.target.phone.value,
		  url: event.target.url.value
		};

		Meteor.call("sponsors.create", sponsorData, function(error, result){
			if(error){
				console.log("error", error);
			}
			else{

				const userData = {
					email: event.target.email.value,
					password: event.target.password.value,
					profile: {
						name: event.target.name.value,
						sponsorId: result,
						type: "sponsor",
						source: 'web'
					}
				};

				Accounts.createUser(userData, function(error) {
					$(event.currentTarget).removeClass('loading');
					if (error) {
						if (error.reason == "Email already exists.") {
							Bert.alert('El correo electrónico ya esta registrado', 'danger');
						}
					} else {
						$('#registerModal').modal('hide');
						FlowRouter.go("myEvents")
						// Meteor.call('users.sendVerificationLink');
						setTimeout(function() {
							Bert.alert('Bienvenid@ ' + Meteor.user().profile.name, 'success');
						}, 750);
					}
				});
			}
		});

	}
});

Template.register.helpers({
	categories() {
		return EventCategories.find();
	}
});
