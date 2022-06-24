const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminVoitureController');

router.get('/', adminController.getAllReservation);

module.exports = router;