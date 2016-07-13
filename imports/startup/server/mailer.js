import { Meteor } from 'meteor/meteor';
import { Mailer } from 'meteor/lookback:emails';
import { Accounts } from 'meteor/accounts-password';


if(Meteor.settings.sendgrid){
	// Set MAIL_URL env variable

	if(!process.env.MAIL_URL){
		process.env.MAIL_URL = 'smtp://'+ Meteor.settings.sendgrid.username +':'+ Meteor.settings.sendgrid.password +'@smtp.sendgrid.net:587';
	}

	const mailConfig = {
		senderEmail: '',
		senderName: '',
		testEmail: '',
		siteName: '',
	}

	Mailer.config({
		from: 			`${mailConfig.senderName} <${mailConfig.senderEmail}>`, // Default 'From:' address. Required.
		//replyTo: 		'Name <name@domain.com>', // Defaults to `from`.
		routePrefix: 	'emails', // Route prefix.
		baseUrl: 		process.env.ROOT_URL, // The base domain to build absolute link URLs from in the emails.
		testEmail: 		mailConfig.testEmail, // Default address to send test emails to.
		logger: 		console, // Injected logger (see further below)
		silent: 		false, // If set to `true`, any `Logger.info` calls won't be shown in the console to reduce clutter.
		addRoutes: 		process.env.NODE_ENV === 'development', // Add routes for previewing and sending emails. Defaults to `true` in development.
		language: 		'html', // The template language to use. Defaults to 'html', but can be anything Meteor SSR supports (like Jade, for instance).
		plainText: 		true, // Send plain text version of HTML email as well.
		plainTextOpts: 	{}
	});

	Templates = {};


	// Templates.messagesNew = {
	// 	path: 'emails/messages-new.html',
	// 	css:  'emails/listings.css',
	// 	helpers: {
	// 		miaw() {
	// 			return 'miaw';
	// 		}
	// 	},
	// 	route: {
	// 		path: '/messages/new',
	// 		data() {
	// 			const message = Messages.findOne({});
	// 			return {
	// 				message: message
	// 			}
	// 		}
	// 	}
	// }


	Mailer.init({
		templates: Templates,
		helpers: { // Global helpers available for all templates.
			money(value) {
				return accounting.formatMoney(value, '$', 0);
			},
			number(value) {
				return accounting.formatNumber(value);
			},
			firstName(fullName) {
				const index = fullName.indexOf(" ");
				if(index < 0){
					return fullName;
				}
				return fullName.substr(0, index);
			},
		},
		layout: false // Global layout template.
	});


	// Set account package emails
	Accounts.emailTemplates.siteName = mailConfig.siteName;
	Accounts.emailTemplates.from     = `${mailConfig.senderName} <${mailConfig.senderEmail}>`;

	Accounts.emailTemplates.verifyEmail = {
		subject() {
			return "Verifica tu cuenta de correo";
		},
		text(user, url) {
			const emailAddress  = user.emails[0].address,
			urlWithoutHash 		= url.replace( '#/', '' ),
			supportEmail   		= mailConfig.senderEmail,
			emailBody      		= `Para verificar tu correo (${emailAddress}) visita el siguiente enlace:\n\n${urlWithoutHash}\n\n Si crees que hay algo incorrecto con este correo, envíanos un mensaje a: ${supportEmail}.`;

			return emailBody;
		}
	};

	Accounts.emailTemplates.resetPassword = {
		subject() {
			return "Restablece tu contraseña en Paisano";
		},
		text(user, url) {
			const emailAddress 	= user.emails[0].address,
			urlWithoutHash 		= url.replace( '#/', '' ),
			supportEmail   		= mailConfig.senderEmail,
			emailBody      		= `Hola ${user.profile.name},\n\nVisita el siguiente enlace para restablecer tu contraseña:\n\n${urlWithoutHash}\n\n Si crees que hay algo incorrecto con este correo, envíanos un mensaje a: ${supportEmail}.`;

			return emailBody;
		}
	};
}
