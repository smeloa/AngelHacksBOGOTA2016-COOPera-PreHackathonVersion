// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { EventCategories } from '../event-categories.js'
// import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('event-categories', function(){
	return EventCategories.find();
});
