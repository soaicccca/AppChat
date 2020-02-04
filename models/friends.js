var mongoose = require('mongoose');
var schema_friends = new mongoose.Schema({
    email: String,
    myfriends: Array
});
module.exports = mongoose.model('Friends', schema_friends);