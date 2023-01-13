const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path');
const app = express();

app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname , './client/public')));
app.get('*' , (req , res) => {
    res.sendFile(path.join(__dirname , './client/public/index.html'));
});

app.listen(process.env.PORT || 5000 , () => {
    console.log('Starting server...');
});