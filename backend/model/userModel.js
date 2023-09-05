const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
    },
})

const model = mongoose.model('User', userSchema);
module.exports = model;