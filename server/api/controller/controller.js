const Contact = require('../models/contact');
const mongoose = require('mongoose');

// Controller to add a new contact
exports.add = (req, res) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.contact_fname+" "+req.body.contact_lname, // Request body requires a name parameter for the product
        phoneNumber: req.body.contact_phone, // Request body requires a price parameter for the product
        email: req.body.contact_email // Request body requires a price parameter for the product
    });
    contact.save().then(result => {
        console.log("ERROR OCCURRED "+result);
    })
    .then(function(res) {
        res.status(200).json({
            message: "Add done"
        });
    })
    .catch(function (err) {
        console.log("error occurred here in controller ")
    })
}

// Controller to list all contacts
exports.list = (req, res) => {
    Contact.find()
    .collation({ locale: "en" })
    .sort({ name: 1 })
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    });
}

// Controller
exports.edit = (req, res) => {
    const id = req.params.id;
    Contact.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log("Contact Not Found "+err);
    })
}

exports.update = (req, res) => {
    const id = req.body.contact_id;
    const name = req.body.contact_name; // Request body requires a name parameter for the product
    const phoneNumber = req.body.contact_phone; // Request body requires a price parameter for the product
    const email = req.body.contact_email; // Request body requires a price parameter for the product
    console.log(id+" "+name+" "+ phoneNumber+" "+ email);
    Contact.updateOne({_id:id},{$set: {
        name: name, 
        phoneNumber: phoneNumber,
        email: email
    }},{multi: true})
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log("Contact Not Found "+err);
    })
}

exports.search = (req, res) => {
    const name = req.params.contact_name;
    // Executing the find query based on the name of the contact
    Contact.find( {'name': { '$regex':name,'$options':'i' }}) // replicates case insensitive a like query
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    // Executing the find query based on the name of the contact\
    Contact.deleteOne({"_id": id}) // Delete By id
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
        console.log("DELETED ID IS "+id);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}
