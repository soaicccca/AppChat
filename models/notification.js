var mongoose = require('mongoose');
var schema_notification = new mongoose.Schema({
    email: String,
    contents: Array
});
module.exports = mongoose.model('Notification', schema_notification);