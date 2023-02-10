const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const File = require('../models/models')
const { v4:uuid4} = require('uuid')


let storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req,file,cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() *1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
})

let upload = multer({
    storage:storage,
    limit:{ fileSize:100000*100 },
}).single('myFile')

router.post('/',(req,res)=>{

    // storing file 

    upload(req,res, async (err)=>{

        // Validating request
        if(!req.file){
            return res.json({error: 'All fields required.'});
        }

        if(err){
            return res.status(500).send({error : err.message})
        }

        const file = new File({
            filename: req.file.filename,
            uuid:uuid4(),
            path: req.file.path,
            size: req.file.size
        });
        const response  = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}}`});
    })

})

router.post('/send', async (req,res)=>{
    const { uuid, emailTo, emailFrom }= req.body;

    if(!uuid || !emailFrom || !emailTo){
        return res.status(422).send({error : "All Field Require."})
    }

    const file = await File.findOne({uuid:uuid})
    if(file.sender){
        return res.status(422).send({error : "Email Already Sent."})
    }

    file.sender = emailFrom;
    file.reciver = emailTo;
    const response = await file.save();


    // send Email
    const sendMail = require('../services/emailService');
    
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject: "FileSHaring",
        text:`${emailFrom} shared file with you`,
        html:require('../services/emailTemplate')({
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+ 'KB',
            expires:'24 Hours'
        
        })
    })
    return res.send({sucess:"True"})
})


module.exports = router;