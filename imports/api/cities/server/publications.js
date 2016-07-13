// import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Cities } from '../cities.js'
// import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publish('cities', function(){
	return Cities.find();
});
