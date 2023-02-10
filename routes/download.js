const routes = require('express').Router();
const file = require('../models/models')

routes.get('/:uuid',async (req,res)=>{
    const fileDownload = await file.findOne({uuid: req.params.uuid});
    if(!fileDownload){
        return res.render('dwnload',{error : 'Link Has been expired.'});
    }

    const filePath = `${__dirname}/../${fileDownload.path}`;
    res.download(filePath);

})

module.exports = routes