const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('./controllers/authController');

//get user
router.get('/', auth, authController.getUser);

//login user
router.post('/', authController.login);

module.exports = router;