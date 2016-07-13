import { Meteor } from 'meteor/meteor';
import { Events } from '/imports/api/events/events.js'
import { Cities } from '/imports/api/cities/cities.js'
import { Organizations } from '/imports/api/organizations/organizations.js'
import { EventCategories } from '/imports/api/event-categories/event-categories.js'


Meteor.startup(function(){
	if(Roles.getUsersInRole('admin', Roles.GLOBAL_GROUP).count() == 0){
		const user = {
			email: 'admin@admin.com',
			password: 'sinclave',
			profile: {
				name: 'Administrador',
				phone: 3203999012,
				source: 'seed',
			}
		}

		const userId = Accounts.createUser(user);

		Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP)
	}


	// Seed categories if there are no categories
	if(EventCategories.find().count() == 0){
		const categories = [
			{name: "Educación"},
			{name: "Juventud en riesgo"},
			{name: "Refugiados"},
			{name: "Tercera Edad"},
			{name: "Cultura"},
			{name: "Deportes"},
			{name: "Salud"},
			{name: "Derechos humanos"},
			{name: "Animales"},
			{name: "Medio Ambiente"},
			{name: "Discapacitados"},
			{name: "Medio Ambiente"}
		]

		categories.map((category) => {
			EventCategories.insert(category);
		});

		console.log("Event categories seeded");
	}

	// Seed cities if theres no cities
	if(Cities.find().count() == 0){
		const cities = [
			{"name":"Armenia","country":"Colombia"},
			{"name":"Barranquilla","country":"Colombia"},
			{"name":"Bello","country":"Colombia"},
			{"name":"Bogotá","country":"Colombia"},
			{"name":"Bucaramanga","country":"Colombia"},
			{"name":"Buenaventura","country":"Colombia"},
			{"name":"Cali","country":"Colombia"},
			{"name":"Cartagena","country":"Colombia"},
			{"name":"Cúcuta","country":"Colombia"},
			{"name":"Dosquebradas","country":"Colombia"},
			{"name":"Envigado","country":"Colombia"},
			{"name":"Floridablanca","country":"Colombia"},
			{"name":"Ibagué","country":"Colombia"},
			{"name":"Itaguí","country":"Colombia"},
			{"name":"Manizales","country":"Colombia"},
			{"name":"Medellín","country":"Colombia"},
			{"name":"Montería","country":"Colombia"},
			{"name":"Neiva","country":"Colombia"},
			{"name":"Palmira","country":"Colombia"},
			{"name":"Pasto","country":"Colombia"},
			{"name":"Pereira","country":"Colombia"},
			{"name":"Popayán","country":"Colombia"},
			{"name":"Riohacha","country":"Colombia"},
			{"name":"Santa Marta","country":"Colombia"},
			{"name":"Sincelejo","country":"Colombia"},
			{"name":"Soacha","country":"Colombia"},
			{"name":"Soledad","country":"Colombia"},
			{"name":"Tuluá","country":"Colombia"},
			{"name":"Tumaco","country":"Colombia"},
			{"name":"Valledupar","country":"Colombia"},
			{"name":"Villavicencio","country":"Colombia"}
		]

		cities.map((city)=>{
			Cities.insert(city);
		});

		console.log("Cities seeded");
	}

	if(Organizations.find().count() == 0){
		const organizations = [
			{
				name: 'Amnistia internacional',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				address: 'Calle 140 # 76-12',
				phone: 36544536,
				url: 'https://www.amnesty.org/es/',
				facebook: 'amnistia.internacional.espana',
			},
			{
				name: 'Fundacion sagrado corazón de jebus',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				address: 'Calle 12 # 22-11',
				phone: 123456789,
				url: 'http://www.jebus.com',
				facebook: 'jebus',
				twitter: 'jebus'
			},
			{
				name: 'Cruz Roja',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				address: 'Calle 34 # 43-34',
				phone: 987654321,
				url: 'http://www.cruzroja.org',
				facebook: 'cruzroja',
				twitter: 'cruzroja'
			},
		]

		organizations.map((organization)=>{
			Organizations.insert(organization);
		});

		console.log('Organizations seeded');
	}

	if(Meteor.users.find().count() == 0){
		const organizations = Organizations.find({}).fetch();

		_.each(organizations, function(organization) {
			const user = {
				email: organization.facebook+'@mailinator.com',
				password: 'sinclave',
				profile: {
					name: organization.name,
					phone: organization.phone,
					source: 'seed',
					organizationId: organization._id, // TODO: insert organization id
				}
			}

			Accounts.createUser(user);
		});

		console.log('Users seeded');
	}

	// Seed events if there are no events
	if(Events.find().count() == 0){
		const categories 	= EventCategories.find({}, {fields: {_id: true}}).fetch();
		const cities		= Cities.find({}, {fields: {_id: true}}).fetch();
		const organizations = Organizations.find({}, {fields: {_id: true}}).fetch();

		for(let i = 1; i < 31; i++){
			const category 		= categories[Math.floor(Math.random()*categories.length)];
			const city 			= cities[Math.floor(Math.random()*cities.length)];
			const organization 	= organizations[Math.floor(Math.random()*organizations.length)];

			const event = {
				name: "This the event number "+i,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				category: category._id,
				city: city._id,
				organizationId: organization._id,
				targetBudget: 1000000*i,
				targetVolunteers: 2*i,
				address: "Address "+i,
				scheduledDate: "2016-09-14T03:13:00.135Z",
				contactPhone: 123456123,
			}

			Events.insert(event);
		}

		console.log("Events seeded");
	}
});
