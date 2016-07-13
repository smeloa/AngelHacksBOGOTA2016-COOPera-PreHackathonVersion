import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { EventCategories } from '../event-categories/event-categories.js'
import { Cities } from '../cities/cities.js'
import { Sponsors } from '../sponsors/sponsors.js'
import { Volunteers } from '../volunteers/volunteers.js'
import { EventDonations } from '../event-donations/event-donations.js'
import { EventPictures } from '../event-pictures/event-pictures.js'
import { Organizations } from '../../api/organizations/organizations.js'
import { _ } from 'meteor/underscore';

export const Events = new Mongo.Collection('events');


/*
 * Collection schema
 *
 */
const EventSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre",
		max: 50
	},
	description: {
		type: String,
		label: "Descripción",
		max: 10000
	},
	shortDescription: {
		type: String,
		label: "Descripción",
		max: 100
	},
	category: {
		type: String,
		label: "Categoria"
	},
	targetBudget: {
		type: Number,
		label: "Presupuesto Requerido"
	},
	targetVolunteers: {
		type: Number,
		label: "Voluntarios Requeridos"
	},
	city: {
		type: String,
		label: "Ciudad"
	},
	organizationId: {
		type: String,
		label: "ID de la organizacion"
	},
	address: {
		type: String,
		label: "Dirección"
	},
	scheduledDate: {
		type: Date,
		label: "Fecha"
	},
	contactPhone: {
		type: Number,
		label: "Teléfono de Contacto"
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
	},
	updatedAt: {
		type: Date,
		autoValue() {
			return new Date();
		}
	}
});

Events.attachSchema(EventSchema);

/*
 * Collection fields
 * Public fields
 *
 */
Events.publicFields = {
	name: true,
	description: true,
	shortDescription: true,
	category: true,
	city: true,
	targetBudget: true,
	targetVolunteers: true,
	organizationId: true,
	address: true,
	scheduledDate: true,
	contactPhone: true,
}

/*
 * Collection fields
 * Basic fields
 *
 */
Events.basicFields = {
	name: true,
	shortDescription: true,
	category: true,
	address:true,
	city: true,
	targetBudget: true,
	organizationId: true,
	scheduledDate: true,
}


/*
 * Collection helpers
 *
 */

Events.helpers({
	categoryName() {
		const category = EventCategories.findOne(this.category);

		if(!category){
			return 'Error';
		}

		return category.name;
	},
	cityData() {
		return Cities.findOne(this.city);
	},
	isVolunteer(){
		let volunteer = Volunteers.findOne({ volunteerId: Meteor.userId(), eventId: this._id });
		if(volunteer){
			return true;
		}
		return false;
	},
	volunteersCount(){
		return Volunteers.find({ eventId: this._id }).count();
	},
	donationProgress(){
		let donations = EventDonations.find({eventId: this._id});
		let total = 0;
		donations.map((donation)=>{
			total += donation.ammount;
		})
		if(total == 0){
			return 0;
		}
		let progress = total/this.targetBudget;
		return (progress*100).toFixed(0);
	},
	donationProgressCapped(){
		let donations = EventDonations.find({eventId: this._id});
		let total = 0;
		donations.map((donation)=>{
			total += donation.ammount;
		})

		let progress = total/this.targetBudget;
		if(progress > 1){
			progress = 1;
		}
		return (progress*100).toFixed(0);
	},
	// cateogory() {
	// 	return EventCategories.findOne(this.categoryId);
	// },
	// city() {
	// 	return Cities.findOne(this.cityId);
	// },
	organization(){
		return Organizations.findOne(this.organizationId);
	},
	mainImage() {
		return EventPictures.findOne({"metadata.eventId": this._id});
	},
	images() {
		return EventPictures.find({"metadata.eventId": this._id});
	},
	sponsorCount(){
		let donations = EventDonations.find({eventId:this._id, type:"sponsor"}, {fields:{ sponsorId: 1 }});

		let sponsorIds = [];

		donations.map((donation)=>{
			sponsorIds.push(donation.sponsorId)
		});

		let uniqueSponsorIds = _.uniq(sponsorIds);
		return Sponsors.find({_id: {$in: uniqueSponsorIds}},{fields:{ _id: 1 }}).count();
	}
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
Events.deny({
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
