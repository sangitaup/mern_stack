const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    confirmPassword:String
}); 

module.exports = mongoose.model("users",userSchema);