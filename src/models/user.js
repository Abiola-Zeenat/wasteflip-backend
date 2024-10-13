const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true
    }, 
    password: {
        type: String,
        required: false,
        minlenght: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    }
},
{
timestamp: true,
}
);

module.exports = mongoose.model('User', UserSchema);