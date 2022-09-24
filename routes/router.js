const express = require('express');
const model = require('../model/model');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , './routes');
    },
    filename: (req , file , cb) => {
        const fileExtension = file.mimetype.split('/')[1];
        const randomFileName = `${Date.now()}.${fileExtension}`;
        cb(null , randomFileName);
    }
});

const upload = multer({storage: storage});

router.get('/employees' , (req , res) => {
    model.find((err , docs) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(docs);
        }
    });
});

router.post('/addmember' , upload.single('image') , (req , res) => {
    const {empFullname , empAddress , empTel , empSalary} = req.body;
    model.create({
        empFullname: empFullname,
        empAddress: empAddress,
        empTel: empTel,
        empSalary: empSalary,
        empPhoto: req.file.filename
    } , err => {
        if(err){
            console.log(err);
        }else{
            res.status(201).json({msg: 'Successfully to add'});
        }
    });
});

router.put('/updatemember/:empid' , upload.single('image') , (req , res) => {
    const {empFullname , empAddress , empTel , empSalary} = req.body;
    const id = req.params.empid;
    model.findById({_id: id} , (err , docs) => {
        if(err){
            console.log(err);
        }else{
            fs.unlink(`./client/build/images/${docs.empPhoto}` , err => {
                if(err){
                    console.log(err);
                }else{
                    model.findByIdAndUpdate({_id: id} , {
                        empFullname: empFullname,
                        empAddress: empAddress,
                        empTel: empTel,
                        empSalary: empSalary,
                        empPhoto: req.file.filename 
                    } , err => {
                        if(err){
                            console.log(err);
                        }else{
                            res.status(200).json({msg: 'Updated success'});
                        }
                    });
                }
            })
        }
    });
});

router.delete('/deletemember/:empid' , (req , res) => {
    const id = req.params.empid;
    model.findById({_id: id} , (err , docs) => {
        if(err){
            console.log(err);
        }else{
            fs.unlink(`./client/build/images/${docs.empPhoto}` , err => {
                if(err){
                    console.log(err);
                }else{
                    model.findByIdAndDelete({_id: id} , (err) => {
                        if(err){
                            console.log(err);
                        }else{
                            res.status(200).json({msg:'Deleted successfully'});
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;