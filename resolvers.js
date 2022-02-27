// Bring in the data models and any other required modules (e.g. Mongoose, etc.)
const listingModel = require('./models/listingmodel');
const userModel = require('./models/usermodel');
const bookingModel = require('./models/bookingmodel');
const { Mongoose, Error } = require('mongoose');
const console = require('console');
const { Number } = require('core-js');

// Define which queries are allowed and how to resolve the queries
const Query = {
	listing: async (_, args) => {
		return await getListing(args);
	},
	user: async (_, args) => {
		return await getUser(args);
	},
	bookingByListing: async (_, args) => {
		return await getBookingByListing(args);
	},
	bookingByUser: async (_, args) => {
		return await getBookingByUser(args);
	}
};

// Define which mutations are allowed and how to resolve the queries
const Mutaion = {
	createListing: async (_, args) => {
		return await addListing(args);
	},
	createUserProfile: async (_, args) => {
		return await addUserProfile(args);
	},
	createBooking: async (_, args) => {
		return await addBooking(args);
	}
};

// Function to add a new booking
async function addBooking(args) {
	// Get the highest booking id in DB and increment by 1
	var lastBookingID = await bookingModel.find().sort({"booking_id":-1}).limit(1); 
	var i = Number(lastBookingID[0].booking_id) + 1;

	// Create a "booking" document with the parameter from the user (argument paramenters)
	var booking = {
		booking_id: i,
		listing_id: args.listing_id,
		user_id: args.user_id,
		booking_date: args.booking_date,
		booking_start: args.booking_start,
		booking_end: args.booking_end
	};

	// Make sure the User ID and Booking ID are valid; i.e. they exist
	// If they exist, create a booking record
	if (await listingModel.find({listing_id: args.listing_id}).countDocuments() !== 0 &&
		await userModel.find({user_id: args.user_id}).countDocuments() !== 0 &&
		await bookingModel.find({
				listing_id: args.listing_id,
				user_id: args.user_id,
				booking_date: args.booking_date,
				booking_start: args.booking_start,
				booking_end: args.booking_end
			}).countDocuments() === 0) {
			bookingModel.create(booking);
			return booking;
	}
}

// Function to add a new listing
async function addListing(args) {
	// Get the highest listing id in DB and increment by 1
	var lastListingID = await listingModel.find().sort({"listing_id":-1}).limit(1); 
	var i = Number(lastListingID[0].listing_id) + 1;

	// Create a "listing" document with the parameter from the user (argument paramenters)
	var listing = {
		listing_id: i, 
		name: args.name, 
		street: args.street,
		city: args.city,
		postal_code: args.postal_code,
		price: args.price,
		email: args.email
	};

	// Make sure the listing doesn't exist and create a listing record
	if (await listingModel.find({
			name: args.name, 
			street: args.street, 
			city: args.city, 
			postal_code: args.postal_code, 
			price: args.price, 
			email: args.email
		}).countDocuments() === 0) {
			listingModel.create(listing);
			return listing;
	}
}

// Function to add a new user profile
async function addUserProfile(args) {
	// Get the highest user id in DB and increment by 1
	var lastUserID = await userModel.find().sort({"user_id":-1}).limit(1); 
	var i = Number(lastUserID[0].user_id) + 1;
	
	// Create a "user" document with the parameter from the user (argument parameters)
	var user = {
		user_id: i, 
		username: args.username, 
		password: args.password, 
		email: args.email
	};

	// Make sure the user profile doesn't exist and create a user record
	if (await userModel.find({
			username: args.username, 
			email: args.email, 
		}).countDocuments() === 0) {
			userModel.create(user);
			return user;
	}
}

// Read the listing model from DB and return necessary ones
async function getlisting(args) {
    if (args.name){
		// Return listing filtered by name
		return [await listingModel.findOne({name: args.name})];
	}
    else if (args.city)
		// Return listing filtered by city
		return [await listingModel.findOne({city: args.city})];
    else
		// Searching all listing
		return await listingModel.find();
}

// Return specific user info depending of User ID provided
async function getUser(args) {
	var uDoc = await userModel.findOne({user_id: args.user_id});
	return uDoc;
}

// Show all bookings filtered by hotel - given hotel's name
async function getBookingByListing(args)  {
	// Create an empty "booking" documents holder
	var bookingDoc = null;
	
	// Retrieve (if available) the listing record with matching listing name
	var listingDoc = await listingModel.findOne({name: args.name});
	
	// Use the ID from the retrieved listing record 
	// to find all matching bookings and return them
	if (listingDoc.name != null) {
		bookingDoc = await bookingModel.find({listing_id: listingDoc.listing_id});
		if (bookingDoc != null) {
			return bookingDoc;
		}
	} else {
		console.warn("listing not found.")
	}
	return null;
}

// Show all bookings filtered by user - given user's username
async function getBookingByUser(args)  {
	// Create an empty "booking" documents holder
	var bookingDoc = null;
	
	// Retrieve (if available) the user profile record with matching username
	var userDoc = await userModel.findOne({username: args.username}); 
	
	// Use the ID from the retrieved user profile record 
	// to find all matching bookings and return them
	if (userDoc.username != null) {
		bookingDoc = await bookingModel.find({user_id: userDoc.user_id});
		if (bookingDoc != null) {
			return bookingDoc;
		}
	} else {
		console.warn("User not found.")
	}
	return null;
}

// This module export (makes "public") Query and Mutation
module.exports = { Query, Mutaion };