const express = require('express');
const payment = require('../controllers/paymentController');

const route = express.Router();
const { isAuthenticatedUser } = require('../middlewares/auth');

route.route('/process').post(isAuthenticatedUser, payment.processPayment);
route.route('/stripeapi').get(isAuthenticatedUser, payment.sendStripeApi);

module.exports = route;