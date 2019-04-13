const mongoose = require('mongoose'); // including the mongoose package

// Schema that will be used to save data to mongo db
const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // MongoDB generated unique ID
    name: String, // Name of the product
    phoneNumber: Number, // Phone number
    email: String // Email
});

module.exports = mongoose.model('Contact', contactSchema);