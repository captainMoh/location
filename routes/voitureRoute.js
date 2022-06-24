const express = require('express');
const router = express.Router();

const voitureController = require('../controllers/voitureController');
const auth = require('../middleware/auth');


router.get('/', voitureController.getAllVoitures)

router.get('/:id', voitureController.getOneVoitures)

router.post('/', voitureController.CreateVoiture)

router.patch('/:id', voitureController.addNewReservationToVoiture)

router.post('/dates', voitureController.postDates)


// router.put('/:id', (req, res) => {
//     if(!ObjectID.isValid(req.params.id))
//         return res.status(400).send(`ID unknown: ${req.params.id}`)

//     const updateRecord = {
//         location: req.body.location
//     }

//     Voiture.findByIdAndUpdate(
//         req.params.id,
//         { $addToSet: updateRecord },
//         { new: true },
//         (err, docs) => {
//             if(!err) res.send(docs)
//             else console.log(`Update error : ${err}`);
//         }
//     )
// })

// router.delete('/:id', (req, res) => {
//     if(!ObjectID.isValid(req.params.id))
//         return res.status(400).send(`ID unknown: ${req.params.id}`)

//     Voiture.findByIdAndRemove(
//         req.params.id,
//         (err, docs) => {
//             if(!err) res.send(docs)
//             else console.log(`Delete error : ${err}`);
//         }
//     )
// })

module.exports = router