const Express = require('express');
require('dotenv').config();
const  db = require('./config/db.js');
const UploadRoutes = require('./routes/router')
const showDownload = require('./routes/showDownload')
const download = require('./routes/download')


const path = require('path')


const app = Express();

//Template Engine

app.set('downloads',path.join(__dirname,'/views'))
app.set('view engine', 'ejs')

app.use(Express.json());
// Routes
app.use('/api/files',UploadRoutes);

app.use('/files',showDownload);
app.use('/file/download',download)




const PORT = process.env.PORT || 3000;

db()

app.listen(PORT,()=>{
    console.log(`Listning on port ${PORT}`)
})