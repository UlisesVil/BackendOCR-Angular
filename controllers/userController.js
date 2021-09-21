'use strict'

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const CONFIG = require('../config/config');

var controller={

    login:(req,res)=>{
        var user = new userModel;
        var userReq = req.body;
        user.email = userReq.email;
        user.password= userReq.password;
        const query= {email:user.email};

        if(user.email==null) return res.status(404).send({message:'No email data was received'});
        userModel.findOne(query)
            .then(userBD=>{
                if(!userBD) return res.status(404).send({message: 'The User was not found, you probably have not registered yet'});

                bcrypt.compare(user.password,userBD.password)
                    .then(match=>{
                        if(match){
                            let payload = {
                                id:userBD._id,
                                userName:userBD.userName,
                                lastName:userBD.lastName,
                                email:userBD.email
                            }
                            jwt.sign(payload,process.env.SECRET_TOKEN, (error,token)=>{//CONFIG.SECRET_TOKEN
                                if(error){
                                    res.status(500).send(error);
                                }else{
                                    res.status(200).send({message:"You have successfully logged in Welcome", token, payload});
                                }
                            });
                        }else{
                            res.status(200).send({message:'Wrong Password'});
                        };
                    })
                    .catch(
                        error=>{
                            res.status(500).send({error});
                        }
                    )
                ;
            })
            .catch(
                error=>{
                    res.status(500).send({error});
                }
            )
        ;
    },

    saveUser: (req, res)=>{
        let userReq= req.body;
        var user= new userModel;
        user.userName =  userReq.userName;
        user.lastName =  userReq.lastName;
        user.email =  userReq.email;
        user.password =  userReq.password;

        user.save((err, savedUser)=>{
            if(err) return res.status(500).send({message: 'Error creating user, please check that the email and password are valid, or maybe you were already registered'});
            if(!savedUser) return res.status(404).send({message:'Data not received'});
            return res.status(200).send({
                message:'User saved successfully',
                data: savedUser
            });
        });
    },
}

module.exports= controller;
