'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var OcrImageSchema= Schema({
    imageName:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    documentName:{
        type: String,
        required: true
    },
    documentType:{
        type: String,
        required: true
    }    
});

module.exports = mongoose.model('OcrImage', OcrImageSchema);