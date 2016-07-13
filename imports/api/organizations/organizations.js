import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Events } from '../events/events.js';

export const Organizations = new Mongo.Collection('organizations');


/*
 * Collection schema
 *
 */
const OrganizationSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre de la ORG",
		unique: true
	},
	description: {
		type: String,
		label: "Descripcion de la ORG"
	},
	address: {
		type: String,
		label: "Dirección de la ORG"
	},
	phone: {
		type: Number,
		label: "Teléfono de la ORG"
	},
	url: {
		type: String,
		label: "URL de la ORG",
		optional: true
	},
	facebook: {
		type: String,
		label: "Usuario de facebook de la ORG",
		optional: true
	},
	twitter: {
		type: String,
		label: "Usuario de twitter de la ORG",
		optional: true
	},
	instagram: {
		type: String,
		label: "Usuario de instagram de la ORG",
		optional: true
	},
	createdAt: {
		type: Date,
		autoValue() {
			if(this.isInsert){
				return new Date();
			}else{
				this.unset();
			}
		}
	}
});

Organizations.attachSchema(OrganizationSchema);

/*
 * Collection fields
 * Public fields
 *
 */
Organizations.publicFields = {
	name: true,
	description: true,
	address: true,
	phone: true,
	url: true,
	facebook: true,
	twitter: true,
	instagram: true,
	createdAt: true,
}

/*
 * Collection fields
 * Basic fields
 *
 */

Organizations.basicFields = {
	name: 1,
	url: 1,
	phone: 1,
	url: 1
}


/*
 * Collection helpers
 *
 */
Organizations.helpers({
	users() {
		return Meteor.users.find({'profile.organizationId': this._id});
	},
	events() {
		return Events.find({org: this._id});
	},
	// logo() {
	// 	return Images.findOne();
	// },
	// cover() {
	// 	return Images.findOne();
	// }
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
Organizations.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
