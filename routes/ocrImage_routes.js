'use strict'

var express = require('express');
var ocrImagesController = require('../controllers/ocrImageController'); 


var router = express.Router();

var multipart= require('connect-multiparty');
var multipartMiddleware= multipart({uploadDir:'./uploads'});


router.post('/save-OcrImageData', ocrImagesController.saveOcrImage);
router.post('/get-imagesdata', ocrImagesController.getImagesData);
router.post('/upload-image/:id', multipartMiddleware, ocrImagesController.uploadImage);
router.get('/getOcrImage/:image', ocrImagesController.getOcrImage);


module.exports = router;