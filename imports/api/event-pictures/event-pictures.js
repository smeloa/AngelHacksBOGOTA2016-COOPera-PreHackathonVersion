import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

let eventPictureStore = new FS.Store.GridFS("event-pictures", {
  maxTries: 5,
  chunkSize: 1024*1024
});

export const EventPictures = new FS.Collection("event-pictures", {
  stores: [eventPictureStore]
});



/*
 * Collection permissions
 * Deny all actions on client-side
 *
 */
EventPictures.allow({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
  download() {
    return true
  }
});
