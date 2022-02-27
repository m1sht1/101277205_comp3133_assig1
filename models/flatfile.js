const { DataStore } = require('notarealdb');
const store = new DataStore('./data');

module.exports = {
    fHotels:store.collection('listing'),
    fBookings:store.collection('bookings'),
    fUsers:store.collection('users'),
}