const express = require('express');
const mongoose = require('mongoose');
const app =express();
const PORT = 3012; 

const cors = require('cors')

const bodyParser = require('body-parser')

 
// create application/json parser
const jsonParser = bodyParser.json()
 
app.use(cors());

 

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const URL_DB = 'mongodb://localhost:27017/user_db';

 mongoose.connect(URL_DB, {useNewUrlParser: true, useUnifiedTopology: true});


const routes = require('./routes'); 

app.use(routes);

app.listen(PORT,() => {
    console.log("The server is running");
});