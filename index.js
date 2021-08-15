'use strict'

var mongoose= require('mongoose');
var app=require('./app');
var PORT= 3700;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/OCRAngular")
    .then(()=>{
        console.log('----Data Base Connection Successfull established----');

        app.listen(PORT,()=>{
            console.log('----Server Running on port 3700----');
        });
    }).catch(err=>console.log(err));



