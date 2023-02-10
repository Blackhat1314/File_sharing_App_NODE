
const mongoos = require('mongoose');

connectDB = async () => {
    try {
        mongoos.set('strictQuery', true)
        await mongoos.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected.');
    } catch (err) {
        console.log('Connection Failed!!');
        console.error(err);
    }
};



module.exports = connectDB;