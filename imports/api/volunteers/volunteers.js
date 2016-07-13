import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Volunteers = new Mongo.Collection('volunteers');


/*
 * Collection schema
 *
 */
const VolunteerSchema = new SimpleSchema({
	volunteerId: {
		type: String,
		label: "Id del Voluntario",
		autoValue: function() {
				if (this.isInsert) {
						return this.userId;
				}
		}
	},
	eventId: {
		type: String,
		label: "Id del Evento"
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

Volunteers.attachSchema(VolunteerSchema);

/*
 * Collection fields
 * Public fields
 *
 */
Volunteers.publicFields = {
	name: true,
}


/*
 * Collection helpers
 *
 */
Volunteers.helpers({
	helper() {
		return '';
	},
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
Volunteers.deny({
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
