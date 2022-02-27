//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://ss:Amir@3125@cluster0.iksxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var dbConn = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConn.on('error', console.error.bind(console, 'MongoDB connection error:'));

//MongoDB Schemas
var bookingSchema = mongoose.Schema({
	booking_id: Number,
	listing_id: Number,
	user_id: Number,
	booking_date: Date,
	booking_start: Date,
	booking_end: Date,
	email: String
});

//Export function to create "BookingModel" model class
module.exports = mongoose.model('bookings', bookingSchema);
