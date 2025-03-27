const express = require("express");
const router = express.Router();
const payment = require("../Controller/paymentController");

router.post('/payBoleto', payment.payBoleto);

router.post('/payCard', payment.payCard);

router.get('/verify', payment.verifyPayment);

router.post('/refund', payment.refund);

module.exports = router;