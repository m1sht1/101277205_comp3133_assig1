
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
var userSchema = mongoose.Schema({
	user_id: Number,
	username: String,
	password: String,
	email: String
});

//Export function to create "UserModel" model class
module.exports = mongoose.model('users', userSchema);
