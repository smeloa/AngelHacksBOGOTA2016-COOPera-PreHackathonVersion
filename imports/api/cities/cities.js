import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Cities = new Mongo.Collection('cities');


/*
 * Collection schema
 *
 */
const CitySchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre de la ciudad"
	},
	country: {
		type: String,
		label: "Pais"
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

Cities.attachSchema(CitySchema);

/*
 * Collection fields
 * Public fields
 *
 */
Cities.publicFields = {
	name: true,
}


/*
 * Collection helpers
 *
 */
Cities.helpers({
	helper() {
		return '';
	},
});


/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
Cities.deny({
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
