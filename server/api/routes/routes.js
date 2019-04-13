const express = require('express');
const router = express.Router();

// Require the contact controllers
const Controller = require('../controller/controller');

// Method to handle REST Call requests
router.post('/add', Controller.add);
router.get('/list', Controller.list);
router.get('/edit/:id', Controller.edit);
router.post('/update', Controller.update);
router.get('/search/:contact_name', Controller.search);
router.get('/delete/:id', Controller.delete);

module.exports = router;