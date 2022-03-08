const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { Model } = require('../model/model');

const nodemailer = require('nodemailer');


router.get('/', (req, res) => {
    Model.find((err, docs) => {
        if(!err) res.send(docs)
        else console.log(`Error to get data: ${err}`);
    })
})

router.get('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    Model.findById(
        req.params.id,
        (err, docs) => {
        if(!err) res.send(docs)
        else console.log(`Error to get data: ${err}`);
    })
})

router.post('/', (req, res) => {
    const newRecord = new Model({
        voiture: req.body.voiture,
        location: req.body.location
    })

    newRecord.save((err, docs) => {
        if(!err) res.json(docs)
        else console.log(`Error creating new data: ${err}`);
    })

})

router.patch('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        location: req.body.location
    }

    const information = {
        location: req.body.location,
        voiture: req.body.voiture
    }

    Model.findByIdAndUpdate(
        req.params.id,
        { $addToSet: updateRecord },
        { new: true, upsert: true },
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Update error : ${err}`);
        }
    )
    console.log(information);
    mail(information);
})


const mail = async (information) => {

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        },
    });

    let info = await transporter.sendMail({
        from: 'aichoun026@gmail.com',
        to: `aichoun026@gmail.com, ${information.location.email}`,
        subject: "Réservation de voiture",
        text: 
    `
    Bonjour, ${information.location.prenom}, vous avez loué le véhicule ${information.voiture}
    Lieu de rendez-vous: ${information.location.lieu}  
    Date de sortie: ${information.location.sortie} à ${information.location.heure}
    Date de retour: ${information.location.retour} à ${information.location.heure}
    Prénom: ${information.location.prenom}
    Nom: ${information.location.nom}
    Email: ${information.location.email}
    Adresse: ${information.location.adresse}, ${information.location.code}, ${information.location.ville}`
        
    });
}

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        location: req.body.location
    }

    Model.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Update error : ${err}`);
        }
    )
})

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    Model.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Delete error : ${err}`);
        }
    )
})

module.exports = router