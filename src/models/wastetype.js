const mongoose = require('mongoose');

const WasteTypeSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        unique: true
    }


})

module.exports = mongoose.model('WasteType', WasteTypeSchema);