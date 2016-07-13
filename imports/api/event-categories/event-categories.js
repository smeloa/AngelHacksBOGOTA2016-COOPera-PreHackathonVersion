import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const EventCategories = new Mongo.Collection('event-categories');


/*
 * Collection schema
 *
 */
const EventCategorySchema = new SimpleSchema({
	name: {
		type: String,
		label: "Categoría"
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

EventCategories.attachSchema(EventCategorySchema);

/*
 * Collection fields
 * Public fields
 *
 */
EventCategories.publicFields = {
	name: true,
}


/*
 * Collection helpers
 *
 */
EventCategories.helpers({
	helper() {
		return '';
	},
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
EventCategories.deny({
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
