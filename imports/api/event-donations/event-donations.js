import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const EventDonations = new Mongo.Collection('event-donations');


/*
 * Collection schema
 *
 */
const EventDonationSchema = new SimpleSchema({
	ammount: {
		type: Number,
		label: "Monto donado"
	},
	eventId: {
		type: String,
		label: "ID del evento"
	},
	sponsorId: {
		type: String,
		label: "ID del sponsor",
		optional: true
	},
	type:{
		type: String,
		label: "Tipo de cuenta que realiza donacion (volunteer, sponsor)"
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
  author: {
      type: String,
      autoValue: function() {
          if (this.isInsert) {
              return this.userId;
          }
      }
  }
});

EventDonations.attachSchema(EventDonationSchema);

/*
 * Collection fields
 * Public fields
 *
 */
EventDonations.publicFields = {
	name: true,
}


/*
 * Collection helpers
 *
 */
EventDonations.helpers({
	// helper() {
	// 	return '';
	// },
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
EventDonations.deny({
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
