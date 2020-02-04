var mongoose = require('mongoose');
var schema_user = new mongoose.Schema({
    avatar: String,
    name: String,
    gender: String,
    email: String,
    password: String
});
module.exports = mongoose.model('User', schema_user);