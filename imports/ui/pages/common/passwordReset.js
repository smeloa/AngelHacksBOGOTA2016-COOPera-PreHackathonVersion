import './passwordReset.html';

import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/indesign:ganalytics';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactiveDict } from 'meteor/reactive-dict';

Template.passwordReset.onCreated(function passwordResetOnCreated() {

});

Template.passwordReset.onRendered(function passwordResetOnRendered(){
	$('#resetPasswordForm').form({
		on: 'submit',
		inline: true,
		fields: {
			password: {
				identifier: 'password',
				rules: [
					{
						type   : 'minLength[6]',
						prompt : 'Tu nueva contraseña debe ser de minimo 6 caracteres.'
					},
					{
						type   : 'empty',
						prompt : 'Ingresa tu nueva contraseña.'
					}
				]
			},
			passwordConfirm: {
				identifier: 'passwordConfirm',
				rules: [
					{
						type   : 'minLength[6]',
						prompt : 'Tu nueva contraseña debe ser de minimo 6 caracteres.'
					},
					{
						type   : 'empty',
						prompt : 'Ingresa tu nueva contraseña.'
					},
					{
						type   : 'match[password]',
						prompt : 'Tus contraseñas no coinciden.'
					}
				]
			},
		},
	});
});



Template.passwordReset.events({
	'submit #resetPasswordForm'(event) {
        event.preventDefault();

        $(event.target).addClass('loading');

        const password          = $(event.target.password).val();
        const passwordConfirm   = $(event.target.passwordConfirm).val();
        const token             = FlowRouter.getParam('token');

        if(password !== passwordConfirm){
			$(event.target).removeClass('loading');
            Bert.alert('Confirma tu nueva contraseña', 'danger');
            return;
        }

        Accounts.resetPassword(token, password, function(error) {
			$(event.target).removeClass('loading');

            if(error){
                console.log(error);
                if(error.reason == 'Token expired'){
                    Bert.alert('El token para cambiar tu contraseña ya expiro.', 'danger');
                }else{
                    Bert.alert('Error al cambiar contraseña.', 'danger');
                }
            }else{
                FlowRouter.go("/");
                Bert.alert('Hemos cambiado tu contraseña exitosamente.', 'success');
            }
        });
    }
});

Template.passwordReset.helpers({

});
