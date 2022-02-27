
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
var listingSchema = mongoose.Schema({
	listing_id: Number,
	name: String,
	street: String,
	city: String,
	postal_code: String,
	price: Number,
	email: String
});

//Export function to create "listingModel" model class
module.exports = mongoose.model("listing", listingSchema);
