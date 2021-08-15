'use strict'

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

var controller={


    login:(req,res)=>{

        var user = new userModel;
        var userReq = req.body;
        console.log(userReq.email+ 'Esta es la data del user');
        user.email = userReq.email;
        user.password= userReq.password;
        console.log(user);
        const query= {email:user.email};

        if(user.email==null) return res.status(404).send({message:'No se recibieron datos del email'});

        userModel.findOne(query)
            .then(userBD=>{
                if(!userBD) return res.status(404).send({message: 'No se encontro al Usuario'});

                bcrypt.compare(user.password,userBD.password)
                    .then(match=>{
                        if(match){
                            let payload = {
                                id:userBD._id,
                                userName:userBD.userName,
                                lastName:userBD.lastName,
                                email:userBD.email
                            }
                            jwt.sign(payload,CONFIG.SECRET_TOKEN, (error,token)=>{
                                if(error){
                                    res.status(500).send(error);
                                }else{
                                    res.status(200).send({message:"Acces Granted", token, payload});
                                }
                            });
                        }else{
                            console.log(user.password, userBD.password);
                            res.status(200).send({message:'Wrong Password'});
                        }
                }).catch(error=>{
                    console.log(error);
                    res.status(500).send({error});
                });
        }).catch(error=>{
            console.log(error);
            res.status(500).send({error});
        });
    },


    saveUser: (req, res)=>{
        console.log(req.body);
        let userReq= req.body;

        var user= new userModel;
        user.userName =  userReq.userName;
        user.lastName =  userReq.lastName;
        user.email =  userReq.email;
        user.password =  userReq.password;


        user.save((err, savedUser)=>{
            if(err) return res.status(500).send({message: 'Error al guardar en base de datos'});
            if(!savedUser) return res.status(404).send({message:'No se recibieron los datos'});
            return res.status(200).send({
                message:'Usuario guardado satisfactoriamente',
                data: savedUser
            });
        });

        console.log(user);
        

    },

}


module.exports= controller;

