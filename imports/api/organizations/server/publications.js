// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Organizations } from '../organizations.js'
// import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('organizations', function(){
	return Organizations.find();
});

Meteor.publish('organizations.basic-info', function(){
	return Organizations.find({}, {fields: Organizations.basicFields});
});
