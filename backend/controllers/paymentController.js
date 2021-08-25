const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');

//Process stripe payment => /api/v1/payment/process
const processPayment = asyncHandler( async (req, res) => {

    const paymentIntent = await stripe.paymentIntents.create({

        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).send({
        success: true,
        client_Secret: paymentIntent.client_secret
    })
})

//Send stripe API key => /api/v1/payment/stripeapi
const sendStripeApi = asyncHandler( async (req, res) => {

    res.status(200).send({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

module.exports = {
    processPayment,
    sendStripeApi
}