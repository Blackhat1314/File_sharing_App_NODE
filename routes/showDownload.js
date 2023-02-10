const router = require('express').Router();
const File = require('../models/models')

router.get('/:uuid',async (req,res)=>{
    try{
        const file = await File.findOne({uuid: req.params.uuid})
        if(!file){
            return res.render('downloads',{error: 'Link Has Been Expired'})
        }

        return res.render('downloads',{
            uuid:file.uuid,
            filename:file.filename,
            fileSize : file.fileSize,
            downloadLink : `${process.env.APP_BASE_URL}/file/download/${file.uuid}`
        })
    }catch(err){
        return res.render('../views/downloads',{error: 'Something went Wrong'})
    }
    
})


module.exports = router;