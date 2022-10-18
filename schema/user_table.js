var mongoose = require('mongoose');
var Schema = mongoose.Schema

var myschema = new Schema({
    user_name : String,
    user_email: String,
    user_password: String,
    user_mobile: Number
});

module.exports = mongoose.model('user',myschema);
