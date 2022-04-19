const mongoose = require('mongoose');


const userVoiture = new mongoose.Schema({
    numReservation: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    sortie: {
        type: String,
        required: true
    },
    retour: {
        type: String,
        required: true
    },
    heure: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },              
    code: {
        type: String,
        required: true
    },              
    ville: {
        type: String,
        required: true
    },              
    adresse: {
        type: String,
        required: true
    },               
    naissance: {
        type: String,
        required: true
    }
})

const voiture = new mongoose.Schema({
    voiture: {
        type: String,
        required: true
    },
    location: {
        type: [userVoiture],
        default: undefined
    }
})


module.exports.Model = mongoose.model('voiture', voiture)

