import './notFound.html';

// import { $ } from 'meteor/jquery';
// import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { Template } from 'meteor/templating';
// import { GAnalytics } from 'meteor/indesign:ganalytics';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactiveDict } from 'meteor/reactive-dict';



Template.notFound.onCreated(function notFoundOnCreated() {
	document.title = 'No encontramos la pagina que estas buscando | Compra o Vende tu moto en BuscoMoto.co';
});

// Template.notFound.onRendered(function notFoundOnRendered(){
//
// });


//
// Template.notFound.events({
//
// });

// Template.notFound.helpers({
// 	helper() {
// 		return 'miaw';
// 	}
// });
