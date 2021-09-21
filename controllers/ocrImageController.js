'use strict'

var OcrImage= require('../models/ocrImageModel');

var controller = {
    
    saveOcrImage: (req,res)=>{
        var imagesOCR=new OcrImage;
        var data=req.body;
        imagesOCR.imageName=data.imageName;
        imagesOCR.userId=data.userId;
        imagesOCR.documentName= data.documentName;
        imagesOCR.documentType= data.documentType;

        imagesOCR.save((err, OcrImageDataStored)=>{
            if(err) return res.status(500).send({message:'Error saving in Database'});
            if(!OcrImageDataStored) return res.status(404).send({message:'Data not received'});
            return res.status(200).send(
                {
                    data: OcrImageDataStored,
                    message: 'Image Data Saved Successfully'
                }
            );
        });
    },

    getImagesData:(req,res)=>{
        var userId=req.body.userId;
        const query= {userId:userId};
        
        OcrImage.find(query).sort('-dateUploaded').exec((err, ImagesOCR)=>{
            if(err) return res.status(500).send({messasge:'Failed to return data'});
            if(!ImagesOCR) return res.status(404).send({message:'There is nothing saved in the database yet'});
            return res.status(200).send({ImagesOCR});
        });
    },

    deleteOcrImage:(req,res)=>{
        var imageId=req.params.imageId;

        OcrImage.findByIdAndDelete(imageId, (err, imageRemoved)=>{
            if(err) return res.status(500).send({message:'No se pudo eliminar'});
            if(!imageRemoved) return res.status(404).send({message:'No se encontro la imagen en la BD'});
            return res.status(200).send({
                message:'Imagen Borrada exitosamente', 
                imageRemoved:imageRemoved
            });
        });
    },

    uploadImageS3: (req, res) => {
        let imageOcrId = req.params.id;
        let fileName=req.file;

        OcrImage.findByIdAndUpdate(imageOcrId,{imageName:fileName}, {new:true}, (err, imageOcrUpdated)=>{
            if(err) return res.status(500).send({message:'La Imagen no se ha subido'});
            if(!imageOcrUpdated) return res.status(404).send({message:'El proyecto no existe'})
            return res.status(200).send({
                files: imageOcrUpdated,
                message: 'Image successfully saved in AWS S3 service'
            });
        });
    }
};

module.exports = controller;