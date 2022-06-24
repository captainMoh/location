const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const voitureRoute = require('./routes/voitureRoute');
const userRoute = require('./routes/useRoute');
const contactRoute = require('./routes/contactRoute');
const stripeRoute = require('./routes/stripeRoute');
const adminVoitureRoute = require('./routes/adminVoitureRoute');

const auth = require('./middleware/auth');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}))


app.use('/create-payment-intent', stripeRoute);
app.use('/voiture', voitureRoute);
app.use('/admin/voiture', auth, adminVoitureRoute);
app.use('/user', userRoute);
app.use('/contacts', contactRoute);
app.use(express.static('client/build'));

app.get('/*', (_,res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})


app.listen(process.env.PORT, () => console.log(`Listening http://localhost:${process.env.PORT}`));