const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { Model } = require('../model/model');

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


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

    const options = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./views'),
            defaultLayout: false
        },
        viewPath: path.resolve('./views'),
        extName: '.handlebars'
    }

    transporter.use('compile', hbs(options))

    let info = await transporter.sendMail({
        from: 'aichoun026@gmail.com',
        to: `aichoun026@gmail.com, ${information.location.email}`,
        subject: "Réservation de voiture",
        template: 'index',
        context: {
            numReservation: information.location.numReservation,
            nom: information.location.nom,
            prenom: information.location.prenom,
            voiture: information.voiture,
            lieu: information.location.lieu,
            sortie: information.location.sortie,
            retour: information.location.retour,
            heure: information.location.heure,
            mail: information.location.email,
            tel: information.location.tel,
            adresse: `${information.location.adresse}, ${information.location.code} ${information.location.ville}`
        },
        attachments: [{
            filename: 'logo3.PNG',
            path: './client/src/image/logo3.PNG',
            cid: 'logo'
        }]
        
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