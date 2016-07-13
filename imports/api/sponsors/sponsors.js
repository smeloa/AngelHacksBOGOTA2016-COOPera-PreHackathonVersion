import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Events } from '../events/events.js';

export const Sponsors = new Mongo.Collection('sponsors');


/*
 * Collection schema
 *
 */
const SponsorSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre del Sponsor",
		unique: true
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

Sponsors.attachSchema(SponsorSchema);

/*
 * Collection fields
 * Public fields
 *
 */
Sponsors.publicFields = {
	name: true,
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

Sponsors.basicFields = {
	name: true,
	url: true,
	phone: true,
	url: true
}


/*
 * Collection helpers
 *
 */
Sponsors.helpers({
	// users() {
	// 	return Meteor.users.find({'profile.organizationId': this._id});
	// },
	// events() {
	// 	return Events.find({org: this._id});
	// },
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
Sponsors.deny({
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
