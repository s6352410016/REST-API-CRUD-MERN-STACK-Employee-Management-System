const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path');
const app = express();

app.use( (req , res , next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers' , 'Content-Type');
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