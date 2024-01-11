const mongoose = require('mongoose');

const userSchma = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

const USER=mongoose.model('user',userSchma);
module.exports=USER;