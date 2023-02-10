const mongoos = require('mongoose');
const Schema = mongoos.Schema;




const fileSchema = new Schema({
    filename: {type: String, required:true},
    path: {type: String, required:true},
    size: {type: Number, required:true},
    uuid: {type: String, required:true},
    sender: {type: String, required:false}, 
    reciver: {type: String, required:false},
},{timestamps:true})

module.exports = mongoos.model('File',fileSchema)