const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.DATABASE;

mongoose.connect(dbUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecting to database...');
}).catch(err => {
    console.log(err);
});

const schema = new mongoose.Schema({
    empFullname: {
        type: String,
        required: true
    },
    empAddress: {
        type: String,
        required: true
    },
    empTel: {
        type: Number,
        required: true
    },
    empSalary: {
        type: Number,
        required: true 
    },
    empPhoto: {
        type: String,
        required: true
    } 
} , {
    timestamps: true
});

module.exports = mongoose.model('employees' , schema);