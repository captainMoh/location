const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const { Voiture } = require('../model/Voiture');

exports.payment = async (req, res) => {
    
    let { time, id, id_voiture } = req.body;

    Voiture.findById(
        id_voiture,
        async (err, docs) => {
            if(!err) {
                const { voiture, prix } = docs
                try {
                    const payment = await stripe.paymentIntents.create({
                        amount: prix * 100 * time,
                        currency: 'EUR',
                        description: `location de ${voiture}`,
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
            }
            else console.log(`Error to get data: ${err}`);
    })
}