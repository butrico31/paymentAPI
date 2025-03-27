const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController")
const authController = require("../Controller/authController");
const middlewareAdmin = require("../middlewares/authMiddleware");


router.post('/register', authController.createUser);

router.post('/login', authController.loginUser);

router.get("/admin", middlewareAdmin.autorizarAdmin, adminController.allUsers);

router.put('/:_id', authController.updateUser);



module.exports = router;