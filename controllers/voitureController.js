const ObjectID = require('mongoose').Types.ObjectId;

const { Voiture } = require('../model/Voiture');

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


exports.getAllVoitures = (req, res, next) => {
    Voiture.find((err, docs) => {
        if(!err) {
            const voitureModel = docs.map(doc => {
                const { prix, voiture, _id } = doc
                return {_id, voiture, prix}
            })

            res.send(voitureModel)
        }
        else console.log(`Error to get data: ${err}`);
    })
}

exports.postDates = (req, res, next) => {
    
    const { start, end } = req.body.date

    Voiture.find((err, docs) => {
        if(!err) {
            const voitureDisponibles = []
            docs.forEach(voiture => {
                const voitureFiltre = voiture.location.map(location => {
                    const libreAvantLocation = (new Date(start) < new Date(location.sortie)) && (new Date(end) < new Date(location.sortie))
                    const libreApresLocation = (new Date(start) > new Date(location.retour)) && (new Date(end) > new Date(location.retour))
                    if((libreApresLocation || libreAvantLocation)) {
                        return location
                    } 
                    return false
                })

                if(!voitureFiltre.includes(false)) voitureDisponibles.push(voiture)
                return voitureDisponibles
            })

            const voitureModel = voitureDisponibles.map(doc => {
                const { prix, voiture, _id } = doc
                return {_id, voiture, prix}
            })
            res.send(voitureModel)
        }
        else console.log(`Error to get data: ${err}`);
    })    
}

exports.getOneVoitures = ('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    Voiture.findById(
        req.params.id,
        (err, docs) => {
        if(!err) {
            const { voiture, prix } = docs
            res.send({ voiture, prix })
        }
        else console.log(`Error to get data: ${err}`);
    })
})

exports.CreateVoiture = ('/', (req, res) => {
    const newRecord = new Voiture({
        voiture: req.body.voiture,
        location: req.body.location
    })

    newRecord.save((err, docs) => {
        if(!err) res.json(docs)
        else console.log(`Error creating new data: ${err}`);
    })

})

exports.addNewReservationToVoiture = ('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const updateRecord = {
        location: req.body.location
    }

    const information = {
        location: req.body.location,
        voiture: req.body.voiture
    }

    Voiture.findByIdAndUpdate(
        req.params.id,
        { $addToSet: updateRecord },
        { new: true, upsert: true },
        (err, docs) => {
            if(!err) res.send(docs)
            else console.log(`Update error : ${err}`);
        }
    )
    mail(information)
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
            sortie: information.location.sortie.split('-').reverse().join('-'),
            retour: information.location.retour.split('-').reverse().join('-'),
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



