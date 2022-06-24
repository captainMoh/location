const ObjectID = require('mongoose').Types.ObjectId;

const { Voiture } = require('../model/Voiture');


exports.getAllReservation = (req, res, next) => {
    Voiture.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(500).json({err}))
}