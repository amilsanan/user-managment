const mongoose = require('mongoose');

const userCredential = mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String,
    createdAt:{
        type: Date,
        default: new Date(),
    }
})

const UserCredential = mongoose.model('User', userCredential);
module.exports =UserCredential;