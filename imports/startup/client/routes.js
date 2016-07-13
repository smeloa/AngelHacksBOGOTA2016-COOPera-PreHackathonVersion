import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-password';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { GAnalytics } from 'meteor/indesign:ganalytics';


// Import to load front templates
import '../../ui/layouts/Front_layout.js';
import '../../ui/pages/front/home.js';
import '../../ui/pages/front/search.js';
import '../../ui/pages/front/eventDetail.js';
import '../../ui/pages/front/eventCreate.js';
import '../../ui/pages/front/eventEdit.js';
import '../../ui/pages/front/myEvents.js';
import '../../ui/pages/front/organizationDetail.js';

import '../../ui/pages/front/register.js';


// Import to load front auth templates
// import '../../ui/layouts/Front_authLayout.js';
// import '../../ui/pages/front/Listings_showAll.js';


// import '../../ui/components/loading.js';
import '../../ui/pages/common/notFound.js';


/**
 * Frontend routes
 *
 */
FlowRouter.route('/', {
	name: 'home',
	title: 'Inicio',
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Front_layout", {content: "home"});
	}
});

FlowRouter.route('/search', {
	name: 'search',
	title: 'Buscar eventos',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			GAnalytics.pageview();
			BlazeLayout.render("Front_layout", {content: "search"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/create', {
	name: 'eventCreate',
	title: 'Crear evento',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Front_layout", {content: "eventCreate"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/:id/edit', {
	name: 'eventEdit',
	title: 'Editar evento',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Front_layout", {content: "eventEdit", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/events/:id', {
	name: 'eventDetail',
	title: 'Event name cant go here - goes in onCreated view event',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Front_layout", {content: "eventDetail", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/my-events', {
	name: 'myEvents',
	title: 'Mis eventos',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Front_layout", {content: "myEvents"});
		}else{
			FlowRouter.go("home")
		}
	}
});

FlowRouter.route('/organizations/:id', {
	name: 'organizationDetail',
	title: 'Organizacion',
	action(params) {
		if(Meteor.loggingIn() || Meteor.userId()){
			BlazeLayout.render("Front_layout", {content: "organizationDetail", id:params.id});
		}else{
			FlowRouter.go("home")
		}
	}
});


/**
 * Admin section
 *
 */
const adminSection = FlowRouter.group({
    prefix: "/admin"
});

// adminSection.route('/', {
// 	name: 'BOHome',
// 	title: 'Panel de Control',
// 	action(params) {
// 		BlazeLayout.render("Back_layout", {content: "Back_home"});
// 	}
// });




/**
 * Login routes
 *
 */
FlowRouter.route( '/verify-email/:token', {
	name: 'verify-email',
	action(params) {
		Accounts.verifyEmail(params.token, (error) => {
			if(error){
				console.log(error.reason);
				Bert.alert('Se produjo un error al verificar tu cuenta.', 'danger');
			}else{
				FlowRouter.go('/');
				Bert.alert('Gracias por verificar tu cuenta.', 'success');
			}
		});
	}
});

FlowRouter.route( '/register', {
	name: 'register',
	title: 'Registrate',
	triggersEnter: [onlyGuest],
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Front_layout", {content: "register"});
	}
});

FlowRouter.route( '/reset-password', {
	name: 'reset-password-email',
	title: 'Olvide mi contraseña',
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Front_layout", {content: "passwordResetEmail"});
	}
});

FlowRouter.route( '/reset-password/:token', {
	name: 'reset-password',
	title: 'Cambiar contraseña',
	action(params) {
		GAnalytics.pageview();
		BlazeLayout.render("Front_layout", {content: "passwordReset"});
	}
});

// FlowRouter.route('/logout', {
// 	name: 'logout',
// 	action(params) {
// 		Meteor.logout();
//
// 		setTimeout(function(){
// 			FlowRouter.go('/');
// 			Bert.alert('Esperamos volver a verte muy pronto', 'success');
// 		}, 100);
// 	}
// });



/**
 * Set action for not found routes
 * Render a 404 page not found view
 */
FlowRouter.notFound = {
	action() {
		BlazeLayout.render("Front_layout", {content: "notFound"});
	}
};



/**
 * Add global onEnter triggers
 *
 */
FlowRouter.triggers.enter([setTitle]);

function setTitle(context, redirect) {
	document.title = FlowRouter.current().route.options.title + ' | Your new app global title';
}




function onlyGuest(context, redirect) {
	if(Meteor.loggingIn() || Meteor.userId()){
		redirect('home');
	}
}

function onlyDesktop(context, redirect) {
	const ua        = navigator.userAgent.toLowerCase();
	const isMobile  = ua.indexOf("mobile") > -1;

	if(isMobile){
		redirect('downloadAPP');
	}
}
