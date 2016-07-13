import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';



export const EventComments = new Mongo.Collection('event-comments');


/*
* Collection schema
*
*/
const EventCommentSchema = new SimpleSchema({
	text: {
		type: String,
		label: "Comentario",
		max: 500
	},
	eventId: {
		type: String,
		label: "Id del Evento"
	},
	userId: {
		type: String,
		label: 'Usuario',
		autoValue() {
			if(this.isInsert){
				return this.userId;
			}
		}
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
	},
});

EventComments.attachSchema(EventCommentSchema);

/*
* Collection fields
* Public fields
*
*/
EventComments.publicFields = {
	name: true,
}


/*
* Collection helpers
*
*/
EventComments.helpers({
	user() {
		return Meteor.users.findOne(this.userId);
	},
});


/*
* Collection permissions
* Deny all actions on client-side
*
*/
EventComments.deny({
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
