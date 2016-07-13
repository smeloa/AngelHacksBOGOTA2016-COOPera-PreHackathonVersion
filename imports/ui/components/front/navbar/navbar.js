import './navbar.html';
import './navbar.css';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { $ } from 'meteor/jquery';
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Roles } from 'meteor/alanning:roles';
// import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactiveDict } from 'meteor/reactive-dict';


// Template.Front_navbar.onCreated((v) => {
//
// });
//
// Template.Front_navbar.onRendered((v) => {
//
// });
//
//
//
Template.Front_navbar.events({
	'click .login'(event){
		event.preventDefault();
		$('#loginModal').modal('show');
	},
	// 'click .register'(event){
	// 	event.preventDefault();
	// 	$('#registerModal').modal('show');
	// },
	'click .logout'(event){
		Meteor.logout();
		FlowRouter.go('/');
		setTimeout(function(){
			Bert.alert('Esperamos volver a verte muy pronto', 'success');
		}, 750);
	}
});

Template.Front_navbar.helpers({
	isSelectedItem(name) {
		if(FlowRouter.getRouteName() == name){
			return 'active';
		}

		return null;
	}
});
