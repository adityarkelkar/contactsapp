const express = require('express');
const router = express.Router(); // Use the router method of express interface
const mongoose = require('mongoose');

const Contact = require('../models/contact');

// Method to handle GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /contacts"
    });
});

// Method to handle add POST requests for contacts
router.post('/add', (req, res, next) => {
    console.log(req);
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.contact_fname+" "+req.body.contact_lname, // Request body requires a name parameter for the product
        phoneNumber: req.body.contact_phone, // Request body requires a price parameter for the product
        email: req.body.contact_email // Request body requires a price parameter for the product
    });
    contact.save().then(result => {
        console.log(result)
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: "Handling POST requests to /products",
        createdContact: contact // Pass the product object as a part of create contact as response parameter
    });
});

router.get('/list', (req, res, next) => {
    Contact.find()
    .collation({ locale: "en" })
    .sort({ name: 1 })
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
});

// :id, passing the contactID
// This will get details of a particular contact
router.get('/edit/:id', (req, res, next) => {
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
});


// This will get details of a particular contact
router.post('/update', (req, res, next) => {
    console.log("into update REST");
    const id = req.body.contact_id;
    const name = req.body.contact_name; // Request body requires a name parameter for the product
    const phoneNumber = req.body.contact_phone; // Request body requires a price parameter for the product
    const email = req.body.contact_email; // Request body requires a price parameter for the product
    console.log("request body for update ")
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
});


// :contact_name, passing variable called contact name in the URL
// This will get details of a particular contact filtered by Name
router.get('/search/:contact_name', (req, res, next) => {
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
});

// :id, passing variable
// This delete the entry from given ID
router.get('/delete/:id', (req, res, next) => {
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
});

module.exports = router;