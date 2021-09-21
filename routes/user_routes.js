'use strict'

var express= require('express');
var userController= require('../controllers/userController');

var router= express.Router();

router.post('/save-user', userController.saveUser);
router.post('/login', userController.login);


module.exports= router;