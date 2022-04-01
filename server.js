const express = require('express');
const path = require('path');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const routes = require('./routes/controllers');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const cors = require('cors');
const nodemailer = require('nodemailer');

const storeItems = new Map([
    [1, {priceInCents: 5000, name: 'Peugeot 208'}],
    [2, {priceInCents: 4000, name: 'Peugeot 301'}],
    [3, {priceInCents: 3000, name: 'Dacia Logan'}],
    [4, {priceInCents: 2000, name: 'Dacia Stepway'}]
])


app.use(express.static('public'));
app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}))

app.post('/create-payment-intent', async (req, res) => {
    
    let { identifiant, time, id } = req.body;
    const item = storeItems.get(identifiant);
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount: item.priceInCents * time,
            currency: 'EUR',
            description: `location de ${item.name}`,
            payment_method: id,
            confirm: true
        })
        
        res.json({
            message: 'Payment Successful',
            success: true,
            clientSecret: payment.client_secret,
            payment
        })
    } catch (error) {
        
        res.json({
            message: 'Payment Failed',
            success: false
        })
    }
})

app.use('/contacts', async (req, res) => {

    const information = req.body.object

    console.log(information);

    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            },
        });
    
        let info = await transporter.sendMail({
            from: 'aichoun026@gmail.com',
            to: `${information.mail}`,
            subject: `${information.nom}`,
            text: `${information.message}`
        });
    } catch (err) {
        console.log(err);
    }
})

app.use('/voiture', routes);

app.use(express.static('client/build'));

app.get('/*', (_,res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})


app.listen(process.env.PORT, () => console.log(`Listening http://localhost:${process.env.PORT}`));