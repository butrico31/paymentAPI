const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController")
const authController = require("../Controller/authController");
const middlewareAdmin = require("../middlewares/authMiddleware")
const payment = require("../Controller/paymentController")

router.post('/register', authController.createUser);

router.post('/login', authController.loginUser);

router.get("/admin", middlewareAdmin.autorizarAdmin, adminController.allUsers);

router.put('/:_id', authController.updateUser);

router.post('/payBoleto', payment.payBoleto);

router.post('/payCard', payment.payCard);

router.post('/payCheckout', payment.payCheckout);

router.get('/verify', payment.verifyPayment);

module.exports = router;