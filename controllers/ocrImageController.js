'use strict'

var OcrImage= require('../models/ocrImageModel');
var fs = require('fs');
var path = require('path');

var controller = {

    saveOcrImage: (req,res)=>{
        console.log(req.body);

        var imagesOCR = new OcrImage;
        var data=req.body;
        imagesOCR.imageName=data.imageName;
        imagesOCR.userId=data.userId;
        imagesOCR.documentName= data.documentName;
        imagesOCR.documentType= data.documentType;
        console.log(imagesOCR+'estos son los dastos del body');

        imagesOCR.save((err, OcrImageDataStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar en Base de Datos'});
            if(!OcrImageDataStored) return res.status(404).send({message:'No se recibieron los datos'});
            return res.status(200).send(
                {
                    data: OcrImageDataStored,
                    message: 'Datos Guardados exitosamente'
                });
        });
    },

    getImagesData:(req,res)=>{
        var userId=req.body.userId;
        const query= {userId:userId};
        console.log(req.body);
        //return res.status(200).send({message:'si llega'});
        
        OcrImage.find(query).exec((err, ImagesOCR)=>{
            if(err) return res.status(500).send({messasge:'Error al Devolver los datos'});
            if(!ImagesOCR) return res.status(404).send({message:'No hay nada guardado en la base de Datos aun'});

            return res.status(200).send({ImagesOCR});
        });
    },

    uploadImage:(req,res)=>{

        
        var imageOcrId = req.params.id;
        var fileName = 'Imagen no subida...';
        console.log(req.files+'esta es el req file');
        if(req.files){
            
            var filePath = req.files.image.path; 
            var fileSplit = filePath.split('\\'); //con esto sacamos el nombre de la imagen con el que se guardo al subir 
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt =='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){

                OcrImage.findByIdAndUpdate(imageOcrId,{imageName:fileName}, {new:true}, (err, imageOcrUpdated)=>{
                    if(err) return res.status(500).send({message:'La Imagen no se ha subido'});

                    if(!imageOcrUpdated) return res.status(404).send({message:'El proyecto no existe'})
                    
                    return res.status(200).send({
                        files: imageOcrUpdated
                    });
                });
            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'La extencion no es valida'});
                        
                });
            }
            
        }else{
            return res.status(200).send({
                message: fileName+'directo al else'
            });
        }
        

    },

    getOcrImage:(req,res)=>{
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({message:'No existe la imagen'});
            }
        });
    }

};


module.exports = controller;