const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path');
const app = express();

app.use( (req , res , next) => {
    res.setHeader('Content-Type' , 'application/form-data');
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods' , 'GET , POST , PUT , DELETE');
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type');
    next();
})
app.use(router);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , './client/build')));
    app.get('*' , (req , res) => {
        res.sendFile(path.join(__dirname , './client/build/index.html'));
    });
}

app.listen(process.env.PORT || 5000 , () => {
    console.log('Starting server...');
});