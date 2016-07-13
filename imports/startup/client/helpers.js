Template.registerHelper("stringLimit", function(string = "", size = 100){
	return string.substring(0, size);
});

Template.registerHelper("money", function(value = 0){
	return accounting.formatMoney(value, '$', 0);
});

Template.registerHelper("number", function(value = 0){
	return accounting.formatNumber(value);
});

Template.registerHelper("getEmail", function(user){
	if(!user){
		return null;
	}
	return user.emails[0].address;
});

Template.registerHelper("isVolunteer", function(){
	let user = Meteor.user();
	if(!user){
		return null;
	}
	else if(user.profile.type == "volunteer"){
		return true
	}
	return false;
});

Template.registerHelper("isSponsor", function(){
	let user = Meteor.user();
	if(!user){
		return null;
	}
	else if(user.profile.type == "sponsor"){
		return true
	}
	return false;
});

Template.registerHelper("isOrganization", function(){
	let user = Meteor.user();
	if(!user){
		return null;
	}
	else if(user.profile.type == "ong"){
		return true
	}
	return false;
});

Template.registerHelper("fromNow", function(day, hour = 0){
	let date;

	if(hour && hour > 0){
		date = moment(day, 'MM-DD-YYYY');
		date.hours(parseInt(hour));
	}else{
		date = moment(day);
	}

	return date.fromNow();
});

Template.registerHelper("datepickerFormat", function(date){
		return moment(date).format("YYYY-MM-DD");
});

Template.registerHelper("dateFormat", function(date){
		return moment(date).format("DD-MM-YYYY");
});

Template.registerHelper("dateMonth", function(date){
		return moment(date).format("MMM");
});

Template.registerHelper("dateDay", function(date){
		return moment(date).format("DD");
});

Template.registerHelper("dateYear", function(date){
		return moment(date).format("YYYY");
});


// TODO: Add options for params
Template.registerHelper("path", function(route){
	if(route){
		return FlowRouter.path(route);
	}
	return null;
});

Helpers = Blaze._globalHelpers;
