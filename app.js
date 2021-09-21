'use strict'

var express= require('express');
const aws = require('aws-sdk');
var app= express();

//load Templates
const ocrAppMainPage= require('./templates/ocrMainPage-template');
const angularProjectsAppMainPage= require('./templates/angularProjectsMainPage');

//Load OCR-APP Routes
var image_routes= require('./ocrApp/routes/ocrImage_routes');
var user_routes= require('./ocrApp/routes/user_routes');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Backend Angular Projects Main Page  
app.get('/',(req,res)=>{
    res.status(200).send( angularProjectsAppMainPage );
});

//Backend Ocr-App Main Page  
app.get('/ocrApp',(req,res)=>{
    res.status(200).send(ocrAppMainPage);
});

//OCR-APP Routes
app.use('/ocrApp', image_routes);
app.use('/ocrApp', user_routes);

module.exports = app;