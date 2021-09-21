'use strict'
const upload = require('../middlewares/file-upload');
var express = require('express');
var ocrImagesController = require('../controllers/ocrImageController'); 

var router = express.Router();

router.post('/save-OcrImageData', ocrImagesController.saveOcrImage);
router.post('/get-imagesdata', ocrImagesController.getImagesData);
router.delete('/deleteOcrImage/:imageId', ocrImagesController.deleteOcrImage);
router.post('/uploadImageS3/:id',upload.array('image', 1), ocrImagesController.uploadImageS3);

module.exports = router;