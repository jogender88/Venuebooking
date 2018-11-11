var mongoose = require('mongoose');
var bSchema = mongoose.Schema;

var BookSchema = new bSchema({
    email: String,
    venue: String,
    society: String,
    eventStartTime:String,
    eventEndTime: String,
    purpose: String,
    status:String,
    applicationTimeStamp:Date,
    eventDate:Date
})//db.collection.find( { field: { $gt: value1, $lt: value2 } } );
module.exports = mongoose.model('bookingApplications', BookSchema);
